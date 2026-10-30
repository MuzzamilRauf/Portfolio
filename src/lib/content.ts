import { getCollection } from "astro:content";

const byDateDesc = (a: Date, b: Date) => b.getTime() - a.getTime();

/** Jobs, newest first. */
export async function getJobs() {
  const jobs = await getCollection("jobs");
  return jobs.sort((a, b) => byDateDesc(a.data.start, b.data.start));
}

/** "2023 – Present" style year range for the experience timeline. */
export function formatYears(start: Date, end?: Date) {
  const from = start.getUTCFullYear();
  const to = end ? end.getUTCFullYear() : "Present";
  return from === to ? String(from) : `${from} – ${to}`;
}

/** Projects by `order`, then newest first. */
export async function getProjects() {
  const projects = await getCollection("projects");
  return projects.sort(
    (a, b) =>
      (a.data.order ?? Number.POSITIVE_INFINITY) -
        (b.data.order ?? Number.POSITIVE_INFINITY) ||
      byDateDesc(a.data.date, b.data.date),
  );
}

/** Published posts, newest first. Drafts show up in dev only. */
export async function getPosts() {
  const posts = await getCollection(
    "posts",
    ({ data }) => import.meta.env.DEV || !data.draft,
  );
  return posts.sort((a, b) => byDateDesc(a.data.date, b.data.date));
}

/** "Sep 15, 2025" */
export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

/** Rough reading time for a markdown body at ~220 words per minute. */
export function readingTime(body = "") {
  const words = body.split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
}
