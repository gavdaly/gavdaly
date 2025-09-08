import { defineCollection, z } from "astro:content";

const PostState = z.union([
  z.literal("idea"),
  z.literal("draft"),
  z.literal("in-progress"),
  z.literal("published"),
  z.literal("updated"),
  z.literal("archived"),
]);

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string().min(1),
    // Accept string dates in frontmatter and coerce to Date
    publishedAt: z.coerce.date(),
    description: z.string().min(10),
    postState: PostState,
    tags: z.array(z.string()).optional(),
  }),
});

const StatusSchema = z.union([
  z.literal("Coming Soon"),
  z.literal("Completed"),
  z.literal("In Progress"),
  z.literal("On Hold"),
]);

const projectsCollection = defineCollection({
  schema: z.object({
    title: z.string().min(1),
    technology: z.array(z.string()).min(1),
    status: StatusSchema,
    link: z.string().url().optional(),
    summary: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const notesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    tags: z.optional(z.array(z.string())),
  }),
});

export const collections = {
  posts: postsCollection,
  projects: projectsCollection,
  notes: notesCollection,
};
