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
    title: z.string(),
    publishedAt: z.date(),
    description: z.string(),
    postState: PostState,
    tags: z.optional(z.array(z.string())),
  }),
});

const StatusSchema = z.union([
  z.literal("Comming Soon"),
  z.literal("Completed"),
  z.literal("Inprogress"),
  z.literal("On Hold"),
]);

const projectsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    sluged: z.string(),
    technology: z.array(z.string()),
    status: StatusSchema,
    link: z.optional(z.string()),
    summary: z.optional(z.string()),
  }),
});

export const collections = {
  posts: postsCollection,
  projects: projectsCollection,
};
