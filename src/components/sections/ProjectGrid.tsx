import { useId, useMemo, useState } from "react";
import { type IconName, iconPaths } from "@/components/ui/icons";

export interface GridProject {
  id: string;
  title: string;
  summary: string;
  tech: string[];
  github?: string;
  external?: string;
}

interface Props {
  projects: GridProject[];
  /** Cards shown before "Show more". */
  initialCount?: number;
}

function Icon({ name, className }: { name: IconName; className: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: static icon markup from icons.ts
      dangerouslySetInnerHTML={{ __html: iconPaths[name] }}
    />
  );
}

export default function ProjectGrid({ projects, initialCount = 6 }: Props) {
  const [filter, setFilter] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const statusId = useId();

  // Filter chips: every tech used by at least two projects, most common first.
  const techs = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects)
      for (const t of p.tech) counts.set(t, (counts.get(t) ?? 0) + 1);
    return [...counts]
      .filter(([, n]) => n > 1)
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([t]) => t);
  }, [projects]);

  const filtered = filter
    ? projects.filter((p) => p.tech.includes(filter))
    : projects;
  const visible = expanded ? filtered : filtered.slice(0, initialCount);
  const hasMore = filtered.length > initialCount;

  const chip = (label: string, value: string | null) => {
    const active = filter === value;
    return (
      <li key={label}>
        <button
          type="button"
          aria-pressed={active}
          onClick={() => setFilter(value)}
          className={`rounded border px-3 py-1.5 font-mono text-xs transition-colors duration-250 ${
            active
              ? "border-accent bg-accent-soft text-accent"
              : "border-line text-fg hover:border-accent hover:text-accent"
          }`}
        >
          {label}
        </button>
      </li>
    );
  };

  return (
    <div>
      {techs.length > 0 && (
        <ul
          aria-label="Filter projects by technology"
          className="mb-8 flex flex-wrap justify-center gap-2"
        >
          {chip("All", null)}
          {techs.map((t) => chip(t, t))}
        </ul>
      )}

      <p id={statusId} aria-live="polite" className="sr-only">
        {filter
          ? `Showing ${filtered.length} ${filter} projects`
          : `Showing all ${filtered.length} projects`}
      </p>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p, i) => {
          const href = p.external ?? p.github;
          return (
            <li
              key={p.id}
              className="card-in group relative flex flex-col rounded bg-surface px-7 py-8 shadow-card transition duration-250 ease-v4 focus-within:-translate-y-1.5 hover:-translate-y-1.5"
              style={{ animationDelay: `${(i % initialCount) * 60}ms` }}
            >
              <div className="mb-8 flex items-center justify-between">
                <Icon name="folder" className="size-10 text-accent" />
                <div className="relative z-10 -mr-2.5 flex items-center">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.title} on GitHub`}
                      className="p-2 text-fg transition-colors hover:text-accent"
                    >
                      <Icon name="github" className="size-5" />
                    </a>
                  )}
                  {p.external && (
                    <a
                      href={p.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${p.title} live site`}
                      className="p-2 text-fg transition-colors hover:text-accent"
                    >
                      <Icon name="external" className="size-[22px]" />
                    </a>
                  )}
                </div>
              </div>
              <h3 className="mb-3 text-[22px] leading-snug font-semibold transition-colors group-hover:text-accent">
                {href ? (
                  // The title link stretches over the whole card.
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="after:absolute after:inset-0 after:rounded"
                  >
                    {p.title}
                  </a>
                ) : (
                  p.title
                )}
              </h3>
              <p className="text-[17px] leading-relaxed">{p.summary}</p>
              <ul className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-6 font-mono text-xs">
                {p.tech.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>

      {filtered.length === 0 && (
        <p className="py-10 text-center">No projects use {filter} yet.</p>
      )}

      {hasMore && (
        <div className="mt-12 text-center">
          <button
            type="button"
            aria-describedby={statusId}
            onClick={() => setExpanded((e) => !e)}
            className="rounded border border-accent px-7 py-4 font-mono text-sm leading-none text-accent transition duration-250 ease-v4 hover:bg-accent-soft"
          >
            {expanded
              ? "Show less"
              : `Show more (${filtered.length - initialCount})`}
          </button>
        </div>
      )}
    </div>
  );
}
