# Observability & Telemetry

This project uses [Cloudflare's Observability platform](https://developers.cloudflare.com/workers/observability/platform/) to capture request and error signals from the Pages Functions runtime.

## 1. Create an Analytics Engine dataset

1. In the Cloudflare dashboard, open **Workers & Pages → Observability**.
2. Create a dataset (e.g. `gavdaly-observability`) using **Workers Analytics Engine**.
3. Bind the dataset to your Pages project using the name `OBS_EVENTS`.

## 2. Configure environment variables

Add the following environment variables to each Cloudflare environment (Production, Preview, etc.):

- `OBS_SAMPLE_RATE` — Fraction of requests to log (defaults to `0.25` if unset). Use lower values for high-traffic environments.
- `OBS_ENVIRONMENT` — A short label (e.g. `production`, `preview`, `local`) used for filtering dashboards.

## 3. What gets collected

Telemetry is stored as structured JSON inside the Analytics Engine dataset. Each entry includes:

- Request metadata: method, route, status, duration, colo, country, and `cf-ray` header.
- Outcome classification (e.g. `pass_through`, `form_success`, `invalid_token`).
- Optional form name for non-sensitive submissions (`contact`).
- Error logs: message and truncated stack traces (max 500 characters).

Personally identifiable information (PII) is **never** written to telemetry. Form fields and headers are excluded; only high-level outcomes and reasons are stored.

## 4. Exploring the data

Use Workers Analytics Engine SQL or exports to analyze performance and reliability trends. Example queries:

```sql
-- Requests by outcome (last 7 days)
SELECT blob_value_1 AS event_type,
       json_extract_string(blob_value_2, '$.outcome') AS outcome,
       COUNT(*) AS total
FROM OBS_EVENTS
WHERE blob_value_1 = 'request'
  AND to_timestamp(timestamp) > now() - INTERVAL '7 days'
GROUP BY event_type, outcome
ORDER BY total DESC;
```

```sql
-- Error rate and p95 duration
SELECT
  JSON_EXTRACT_STRING(blob_value_2, '$.environment') AS environment,
  APPROX_PERCENTILE(JSON_EXTRACT_DOUBLE(blob_value_2, '$.durationMs'), 0.95) AS p95_ms,
  COUNT_IF(JSON_EXTRACT_INT(blob_value_2, '$.status') >= 500) * 1.0 / COUNT(*) AS error_rate
FROM OBS_EVENTS
WHERE blob_value_1 = 'request'
GROUP BY environment;
```

## 5. Alerting and dashboards

- Connect the dataset to **Logpush** or **R2** for long-term retention if needed.
- Build Grafana or Cloudflare Dashboard panels using the queries above to watch for regression spikes.
- Combine with the quarterly [CI runtime review](ci-runtime-review.md) to align operational telemetry with pipeline metrics.

## 6. Local development

The telemetry client gracefully skips logging when the dataset binding is absent, so local development continues without analytics. Update `.env` with `OBS_SAMPLE_RATE` and `OBS_ENVIRONMENT` to experiment with sampling settings in isolated environments if desired.
