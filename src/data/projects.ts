type Status = "Comming Soon" | "Completed" | "Inprogress" | "On Hold";

export interface Project {
  slug: string;
  title: string;
  techs: string[];
  status: Status;
  link?: string;
  summary?: string;
}

export const projects: Project[] = [
  {
    slug: "clock-in",
    title: "Clock In",
    techs: [
      "Leptos",
      "Axum",
      "Postgres",
      "Cloudflare Tunnel",
      "Docker",
      "OpenProps",
    ],
    link: "https://github.com/gavdaly/clockr",
    summary: "A single tenent timetracking app.",
    status: "On Hold",
  },
  {
    slug: "gav-dev",
    title: "GavDev",
    techs: ["Astro", "Blog", "Cloudflare Pages"],
    link: "https://www.gavdev.xyz/",
    status: "Inprogress",
  },
  {
    slug: "lordly",
    title: "Lordly",
    techs: ["HTML", "CSS"],
    link: "https://github.com/lordly",
    status: "Comming Soon",
  },
  {
    slug: "small-business-internal-network",
    title: "Small Business Internal Network",
    techs: ["pfSense", "Tailscale"],
    summary: "A small business internal network.",
    status: "Completed",
  },
];

export default projects;
