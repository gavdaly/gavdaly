import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const PostState = z.union([
  z.literal("idea"),
  z.literal("draft"),
  z.literal("in-progress"),
  z.literal("published"),
  z.literal("updated"),
  z.literal("archived"),
]);

const StatusSchema = z.union([
  z.literal("Coming Soon"),
  z.literal("Completed"),
  z.literal("In Progress"),
  z.literal("On Hold"),
]);

export const collections = {
  posts: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
    schema: z.object({
      title: z.string().min(1),
      publishedAt: z.coerce.date(),
      description: z.string().min(10),
      postState: PostState,
      tags: z.array(z.string()).optional(),
    }),
  }),
  projects: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
    schema: z.object({
      title: z.string().min(1),
      technology: z.array(z.string()).min(1),
      status: StatusSchema,
      link: z.string().url().optional(),
      summary: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
  }),
  notes: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/notes" }),
    schema: z.object({
      title: z.string(),
      tags: z.array(z.string()).optional(),
    }),
  }),
};
