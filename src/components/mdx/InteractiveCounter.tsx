import { createSignal } from "solid-js";

export default function InteractiveCounter() {
  const [count, setCount] = createSignal(0);

  return (
    <div class="flex flex-col gap-4 rounded-lg border border-sky-200/70 bg-sky-50 p-4 text-sm text-sky-900 shadow-sm dark:border-sky-800/70 dark:bg-sky-900/30 dark:text-sky-100">
      <p class="font-semibold">MDX + Solid counter</p>
      <p>
        Button presses: <span class="font-mono">{count()}</span>
      </p>
      <div class="flex gap-2">
        <button
          type="button"
          class="rounded-full bg-sky-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white transition hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700"
          onClick={() => setCount((value) => value + 1)}
        >
          Increase
        </button>
        <button
          type="button"
          class="rounded-full border border-sky-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-600 transition hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-700 dark:border-sky-400 dark:text-sky-300 dark:hover:bg-sky-800/40"
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
