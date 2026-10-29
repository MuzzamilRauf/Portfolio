/** One entry in /search.json (built by src/pages/search.json.ts, read by Search.astro). */
export interface SearchItem {
  type: "page" | "project" | "post" | "tag";
  title: string;
  description?: string;
  url: string;
  keywords?: string;
}
