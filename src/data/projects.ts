type Status = "Comming Soon" | "Completed" | "Inprogress" | "On Hold";

export interface Project {
  slug?: string;
  title: string;
  techs: string[];
  link?: string;
  description?: string;
  status?: Status;
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
    description: "A single tenent timetracking app.",
    status: "On Hold",
  },
  {
    slug: "gav-dev",
    title: "GavDev",
    techs: ["Astro", "Blog", "Cloudflare Pages"],
    link: "https://www.gavdev.xyz/",
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
    description: "A small business internal network.",
  },
];

export default projects;
