import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    publishedAt: z.date(),
    description: z.string(),
    isPublish: z.boolean(),
    isDraft: z.boolean().default(false),
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
