import { getCollection } from "astro:content";

const byDateDesc = (a: Date, b: Date) => b.getTime() - a.getTime();

/** Jobs, newest first. */
export async function getJobs() {
  const jobs = await getCollection("jobs");
  return jobs.sort((a, b) => byDateDesc(a.data.start, b.data.start));
}

/** "Jan 2023 – Present" style range for a job. */
export function formatRange(start: Date, end?: Date) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
  return `${fmt.format(start)} – ${end ? fmt.format(end) : "Present"}`;
}

export async function getFeaturedProjects() {
  const projects = await getCollection("projects", ({ data }) => data.featured);
  return projects.sort((a, b) => a.data.featuredOrder - b.data.featuredOrder);
}

/** Non-featured projects for the home page grid, newest first. */
export async function getGridProjects() {
  const projects = await getCollection(
    "projects",
    ({ data }) => !data.featured && data.showInGrid,
  );
  return projects.sort((a, b) => byDateDesc(a.data.date, b.data.date));
}

export async function getArchiveProjects() {
  const projects = await getCollection(
    "projects",
    ({ data }) => data.showInArchive,
  );
  return projects.sort((a, b) => byDateDesc(a.data.date, b.data.date));
}

/** Published posts, newest first. Drafts show up in dev only. */
export async function getPosts() {
  const posts = await getCollection(
    "posts",
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return posts.sort((a, b) => byDateDesc(a.data.date, b.data.date));
}

/** Every tag used by published posts, with its post count, alphabetical. */
export async function getTags() {
  const counts = new Map<string, number>();
  for (const post of await getPosts()) {
    for (const tag of post.data.tags)
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }
  return [...counts].sort(([a], [b]) => a.localeCompare(b));
}

/** URL-safe tag slug: "Web Dev" → "web-dev". */
export function tagSlug(tag: string) {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
