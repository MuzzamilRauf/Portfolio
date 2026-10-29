// Site-wide personal details. PLACEHOLDER content — replace in Phase 8.
// Jobs, projects, and posts live in src/content/; the headshot in src/assets/.

export const site = {
  name: "Your Name",
  role: "Software Engineer",
  description:
    "Your Name is a software engineer who builds fast, accessible experiences for the web.",
  url: "https://example.com",
  email: "hello@example.com",
  location: "City, Country",
  // Put the PDF at public/resume.pdf, or set to undefined to hide the link.
  resume: undefined as string | undefined,
  // Formspree form ID (the part after formspree.io/f/). Set in Phase 9.
  formspreeId: import.meta.env.PUBLIC_FORMSPREE_ID as string | undefined,
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
  skills: [
    "TypeScript",
    "React",
    "Astro",
    "Node.js",
    "Tailwind CSS",
    "PostgreSQL",
  ],
  headshotAlt: "Headshot of Your Name",
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
  { name: "Work", href: "/#projects" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/#contact" },
];

export const credit = {
  text: "Design inspired by Brittany Chiang",
  url: "https://github.com/bchiang7/v4",
};
