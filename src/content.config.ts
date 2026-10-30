import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

// One file per job. The markdown body is a short 1–2 line description.
const jobs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/jobs" }),
  schema: ({ image }) =>
    z.object({
      company: z.string(),
      title: z.string(),
      url: z.url().optional(),
      location: z.string().optional(),
      // Square company logo; without one, the company's initial is shown.
      logo: image().optional(),
      start: z.coerce.date(),
      // Leave out for a current job ("Present").
      end: z.coerce.date().optional(),
    }),
});

// One file per project, listed in the Work section.
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
      // Small thumbnail next to the description; without one, a folder icon is shown.
      cover: image().optional(),
      coverAlt: z.string().optional(),
      // Lower numbers show first; projects without one follow, newest first.
      order: z.number().optional(),
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
