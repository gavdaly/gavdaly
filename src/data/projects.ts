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
  { badgeClass: string }
> = {
  Completed: {
    badgeClass:
      "bg-sky-100/80 text-sky-700 ring-sky-400/40 dark:bg-sky-900/40 dark:text-sky-200",
  },
  "In Progress": {
    badgeClass:
      "bg-blue-100/80 text-blue-700 ring-blue-400/40 dark:bg-blue-900/40 dark:text-blue-200",
  },
  "On Hold": {
    badgeClass:
      "bg-slate-200/70 text-slate-600 ring-slate-400/40 dark:bg-slate-800/50 dark:text-slate-200",
  },
  "Coming Soon": {
    badgeClass:
      "bg-indigo-100/80 text-indigo-700 ring-indigo-400/40 dark:bg-indigo-900/40 dark:text-indigo-200",
  },
};
