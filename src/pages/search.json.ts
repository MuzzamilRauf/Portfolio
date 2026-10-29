// Static index for the Ctrl+K search, fetched the first time the palette opens.
import { getArchiveProjects, getPosts, getTags, tagSlug } from "@/lib/content";
import type { SearchItem } from "@/lib/search";

const pages: SearchItem[] = [
  { type: "page", title: "About", url: "/#about" },
  { type: "page", title: "Experience", url: "/#experience" },
  { type: "page", title: "Featured projects", url: "/#projects" },
  {
    type: "page",
    title: "Contact",
    url: "/#contact",
    keywords: "email message hire",
  },
  {
    type: "page",
    title: "Archive",
    description: "All projects",
    url: "/archive",
  },
  { type: "page", title: "Blog", description: "All posts", url: "/blog" },
];

export async function GET() {
  const [projects, posts, tags] = await Promise.all([
    getArchiveProjects(),
    getPosts(),
    getTags(),
  ]);

  const items: SearchItem[] = [
    ...pages,
    ...projects.map(({ data }) => ({
      type: "project" as const,
      title: data.title,
      description: data.summary,
      url: data.external ?? data.github ?? "/archive",
      keywords: [...data.tech, data.company].filter(Boolean).join(" "),
    })),
    ...posts
      .filter((post) => !post.data.draft)
      .map((post) => ({
        type: "post" as const,
        title: post.data.title,
        description: post.data.description,
        url: `/blog/${post.id}`,
        keywords: post.data.tags.join(" "),
      })),
    ...tags.map(([tag, count]) => ({
      type: "tag" as const,
      title: `#${tag}`,
      description: `${count} post${count === 1 ? "" : "s"}`,
      url: `/blog/tags/${tagSlug(tag)}`,
    })),
  ];

  return new Response(JSON.stringify(items), {
    headers: { "Content-Type": "application/json" },
  });
}
