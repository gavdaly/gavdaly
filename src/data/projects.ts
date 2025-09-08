type Status = "Coming Soon" | "Completed" | "In Progress" | "On Hold";

export interface Project {
  slug: string;
  title: string;
  technology: string[];
  status: Status;
  link?: string;
  summary?: string;
  tags?: string[];
}
