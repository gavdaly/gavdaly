type Status = "Comming Soon" | "Completed" | "Inprogress" | "On Hold";

export interface Project {
  slug: string;
  title: string;
  technology: string[];
  status: Status;
  link?: string;
  summary?: string;
}
