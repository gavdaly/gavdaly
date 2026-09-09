import { getCollection } from "astro:content";

interface MarkdownPage {
  title: string;
  description: string;
  body: string;
}

interface ContentEntry {
  id: string;
  body: string;
  data: {
    title: string;
    description?: string;
    summary?: string;
    tags?: string[];
  };
}

async function getTypedCollection(name: "posts" | "notes" | "projects") {
  return (await getCollection(name)) as unknown as ContentEntry[];
}

const staticPages: Record<string, MarkdownPage> = {
  index: {
    title: "Gavin Daly",
    description: "Developer from Canada.",
    body: "This is the personal portfolio and writing site of Gavin Daly. It contains software projects, technical notes, and writing about development, infrastructure, privacy, and security.",
  },
  about: {
    title: "About Gavin Daly",
    description: "About Gavin Daly and this website.",
    body: "I’m Gavin Daly, a software developer based in Canada. This website shares the projects I build, technical notes I want to remember, and writing about the tools and ideas that shape my work.",
  },
  contact: {
    title: "Contact Gavin Daly",
    description: "Get in touch with Gavin Daly.",
    body: "Use the contact form on the HTML version of this page to send Gavin Daly a message.",
  },
  privacy: {
    title: "Privacy",
    description: "Privacy information for gavdaly.com.",
    body: "This is a personal website operated by Gavin Daly. Most pages are static documents and can be read without an account or registration. Contact-form submissions are processed so Gavin can receive and answer requests.",
  },
  uses: {
    title: "Uses",
    description: "Tools and equipment Gavin Daly uses.",
    body: "A list of tools, software, hardware, and services used by Gavin Daly.",
  },
  posts: {
    title: "Posts",
    description: "Writing by Gavin Daly.",
    body: "Browse the latest posts by Gavin Daly.",
  },
  notes: {
    title: "Notes",
    description: "Technical notes by Gavin Daly.",
    body: "Browse technical notes about software, infrastructure, privacy, and related topics.",
  },
  projects: {
    title: "Projects",
    description: "Projects by Gavin Daly.",
    body: "Browse software, infrastructure, home-lab, and network projects by Gavin Daly.",
  },
  tags: {
    title: "Tags",
    description: "Topics on gavdaly.com.",
    body: "Browse posts, notes, and projects by topic.",
  },
  "404": {
    title: "Not Found",
    description: "The requested page could not be found.",
    body: "This URL does not identify a page on gavdaly.com. See https://gavdaly.com/sitemap-index.xml or https://gavdaly.com/llm.txt to find available content.",
  },
  "500": {
    title: "Something went wrong",
    description: "An unexpected error occurred.",
    body: "The site could not complete this request. Try again or visit https://gavdaly.com/.",
  },
};

export async function getStaticPaths() {
  const posts = await getTypedCollection("posts");
  const notes = await getTypedCollection("notes");
  const projects = await getTypedCollection("projects");

  const tags = new Set(
    [...posts, ...notes, ...projects].flatMap((entry) => entry.data.tags ?? []),
  );

  const entries = [
    ...Object.entries(staticPages).map(([slug, page]) => ({ slug, page })),
    ...posts.map(({ id, data, body }) => ({
      slug: `posts/${id}`,
      page: {
        title: data.title,
        description: data.description,
        body,
      },
    })),
    ...notes.map(({ id, data, body }) => ({
      slug: `notes/${id}`,
      page: {
        title: data.title,
        description: `Notes about ${data.title}`,
        body,
      },
    })),
    ...projects.map(({ id, data, body }) => ({
      slug: `projects/${id}`,
      page: {
        title: data.title,
        description: data.summary ?? `Project: ${data.title}`,
        body,
      },
    })),
    ...[...tags].map((tag) => ({
      slug: `tags/${tag}`,
      page: {
        title: `Tag: ${tag}`,
        description: `Posts, notes, and projects tagged ${tag}.`,
        body: `Browse the content on gavdaly.com tagged **${tag}**.`,
      },
    })),
  ];

  return entries.map(({ slug, page }) => ({
    params: { slug },
    props: { page },
  }));
}

export function GET({ props }: { props: { page: MarkdownPage } }) {
  const { title, description, body } = props.page;
  return new Response(`# ${title}\n\n${description}\n\n${body}\n`, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
