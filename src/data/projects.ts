export type ProjectStatus =
  | "Coming Soon"
  | "Completed"
  | "In Progress"
  | "On Hold";

export interface Project {
  slug: string;
  title: string;
  technology: string[];
  status: ProjectStatus;
  link?: string;
  summary?: string;
  tags?: string[];
}

export const PROJECT_STATUS_META: Record<
  ProjectStatus,
  { icon: string; badgeClass: string }
> = {
  "Completed": {
    icon: "✅",
    badgeClass:
      "bg-emerald-100/80 text-emerald-700 ring-emerald-400/40 dark:bg-emerald-900/40 dark:text-emerald-200",
  },
  "In Progress": {
    icon: "⚙️",
    badgeClass:
      "bg-amber-100/80 text-amber-700 ring-amber-400/40 dark:bg-amber-900/40 dark:text-amber-200",
  },
  "On Hold": {
    icon: "⏸️",
    badgeClass:
      "bg-slate-200/70 text-slate-600 ring-slate-400/40 dark:bg-slate-800/50 dark:text-slate-200",
  },
  "Coming Soon": {
    icon: "✨",
    badgeClass:
      "bg-sky-100/80 text-sky-700 ring-sky-400/40 dark:bg-sky-900/40 dark:text-sky-200",
  },
};
