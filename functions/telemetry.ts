import type { AnalyticsEngineDataset } from "@cloudflare/workers-types";

const DEFAULT_SAMPLE_RATE = 0.25;
const MAX_STACK_LENGTH = 500;
const MAX_MESSAGE_LENGTH = 300;

export interface ObservabilityBindings {
  OBS_EVENTS?: AnalyticsEngineDataset;
  OBS_SAMPLE_RATE?: string;
  OBS_ENVIRONMENT?: string;
}

export type RequestLogEvent = {
  requestId: string;
  route: string;
  method: string;
  status: number;
  durationMs: number;
  outcome: string;
  colo?: string;
  country?: string;
  rayId?: string | null;
  details?: string;
  formName?: string;
};

export type ErrorLogEvent = {
  requestId: string;
  route: string;
  method: string;
  message: string;
  stack?: string;
};

export class TelemetryClient {
  private readonly dataset?: AnalyticsEngineDataset;
  private readonly sampleRate: number;
  readonly environment: string;

  constructor(bindings: ObservabilityBindings) {
    this.dataset = bindings.OBS_EVENTS;
    this.sampleRate = parseSampleRate(bindings.OBS_SAMPLE_RATE);
    this.environment = bindings.OBS_ENVIRONMENT ?? "unknown";
  }

  recordRequest(event: RequestLogEvent): Promise<void> {
    if (!this.dataset || !this.shouldSampleRequest()) {
      return Promise.resolve();
    }

    const payload = {
      ...event,
      environment: this.environment,
    };

    try {
      this.dataset.writeDataPoint({
        blobs: ["request", JSON.stringify(payload)],
        doubles: [event.durationMs],
      });
    } catch (error) {
      console.warn("Failed to write request telemetry", error);
    }

    return Promise.resolve();
  }

  recordError(event: ErrorLogEvent): Promise<void> {
    if (!this.dataset) {
      return Promise.resolve();
    }

    const payload = {
      ...event,
      message: event.message.slice(0, MAX_MESSAGE_LENGTH),
      environment: this.environment,
      stack: event.stack?.slice(0, MAX_STACK_LENGTH),
    };

    try {
      this.dataset.writeDataPoint({
        blobs: ["error", JSON.stringify(payload)],
      });
    } catch (error) {
      console.warn("Failed to write error telemetry", error);
    }

    return Promise.resolve();
  }

  private shouldSampleRequest(): boolean {
    if (this.sampleRate >= 1) {
      return true;
    }
    return Math.random() < this.sampleRate;
  }
}

export function createTelemetryClient(
  bindings: ObservabilityBindings,
): TelemetryClient {
  return new TelemetryClient(bindings);
}

function parseSampleRate(sampleRate?: string): number {
  if (!sampleRate) {
    return DEFAULT_SAMPLE_RATE;
  }
  const parsed = Number.parseFloat(sampleRate);
  if (Number.isNaN(parsed)) {
    return DEFAULT_SAMPLE_RATE;
  }
  return Math.min(1, Math.max(0, parsed));
}
