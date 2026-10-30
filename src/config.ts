// Site-wide personal details. PLACEHOLDER content — replace in Phase 8.
// Jobs, projects, and posts live in src/content/; the headshot in src/assets/.

export const site = {
  name: "Muzzamil Rauf",
  role: "AI/ML & Backend Engineer",
  description:
    "Muzzamil Rauf is an AI/ML and backend engineer. Projects, experience, and writing.",
  url: "https://example.com",
  email: "hello@example.com",
  location: "City, Country",
  // PLACEHOLDER PDF at public/resume.pdf — replace with the real resume (same file name).
  resume: "/resume.pdf",
};

export const hero = {
  greeting: "Hi, my name is",
  headline: "I build things for the web.",
  intro:
    "I'm a software engineer specializing in building exceptional digital experiences. Right now I'm focused on placeholder work at a placeholder company.",
};

export const about = {
  paragraphs: [
    "Hello! This is placeholder text for your story — how you got into programming, what you enjoy building, and what drives you.",
    "Fast-forward to today, and you've had the privilege of working at a few interesting places. Mention them here, along with what you focus on day to day.",
    "Wrap up with something current: a side project, a course you're teaching, or what you're learning next.",
  ],
  skills: ["Python", "PyTorch", "FastAPI", "PostgreSQL", "Docker", "AWS"],
  headshotAlt: "Headshot of Muzzamil Rauf",
};

export const contact = {
  text: "Placeholder: my inbox is always open — for work, collaborations, or just to say hi.",
};

export type SocialIcon = "github" | "linkedin" | "x" | "instagram" | "codepen";

export const socials: { name: string; url: string; icon: SocialIcon }[] = [
  { name: "GitHub", url: "https://github.com/", icon: "github" },
  { name: "LinkedIn", url: "https://www.linkedin.com/", icon: "linkedin" },
  { name: "X", url: "https://x.com/", icon: "x" },
  { name: "Instagram", url: "https://www.instagram.com/", icon: "instagram" },
];

export const nav = [
  { name: "About", href: "/#about" },
  { name: "Experience", href: "/#experience" },
  { name: "Work", href: "/#work" },
  { name: "Blog", href: "/#blog" },
  { name: "Contact", href: "/#contact" },
];
