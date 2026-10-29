import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// One file per job. The markdown body holds the bullet points.
const jobs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/jobs" }),
  schema: z.object({
    company: z.string(),
    title: z.string(),
    url: z.url().optional(),
    location: z.string().optional(),
    start: z.coerce.date(),
    // Leave out for a current job ("Present").
    end: z.coerce.date().optional(),
  }),
});

// Every project lives here. `featured` puts it in the big showcase on the home page,
// `showInGrid` / `showInArchive` control the other two lists.
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      date: z.coerce.date(),
      tech: z.array(z.string()).default([]),
      github: z.url().optional(),
      external: z.url().optional(),
      company: z.string().optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      featured: z.boolean().default(false),
      // Lower numbers show first among featured projects.
      featuredOrder: z.number().default(99),
      showInGrid: z.boolean().default(true),
      showInArchive: z.boolean().default(true),
    }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // Drafts are visible in `pnpm dev` only.
    draft: z.boolean().default(false),
  }),
});

export const collections = { jobs, projects, posts };
