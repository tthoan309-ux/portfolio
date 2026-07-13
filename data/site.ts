import profile from "@/content/profile.json";
import experience from "@/content/experience.json";
import skills from "@/content/skills.json";
import publications from "@/content/publications.json";
import activities from "@/content/activities.json";

export { profile, experience, skills, publications, activities };

const vercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const siteConfig = {
  name: profile.preferredName,
  legalName: profile.fullName,
  title: profile.position,
  description: `${profile.fullName} is an undergraduate researcher in International Economics at Foreign Trade University, working across econometrics, artificial intelligence, data science, and public policy.`,
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelHost ? `https://${vercelHost}` : "http://localhost:3000"),
  location: profile.location,
};
