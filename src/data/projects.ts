export type Project = {
  title: string;
  techs: string[];
  link: string;
  isComingSoon?: boolean;
};

const projects: Project[] = [
  {
    title: "Clock In",
    techs: ["Leptos", "Axum", "Postgres", "Cloudflare Tunnel, Docker", "OpenProps"],
    link: "https://github.com/gavdaly/dictionary-app",
  },
  {
    title: "GavDev",
    techs: ["Astro", "Blog", "Cloudflare Pages"],
    link: "https://www.gavdev.xyz/",
  },
  {
    title: "Lordly",
    techs: ["HTML", "CSS"],
    link: "https://github.com/gavdaly",
    isComingSoon: true,
  },
];

export default projects;
