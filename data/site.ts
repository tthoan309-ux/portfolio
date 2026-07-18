import profile from "@/content/profile.json";
import experience from "@/content/experience.json";
import publications from "@/content/publications.json";
import activities from "@/content/activities.json";
import capabilities from "@/content/capabilities.json";
import researchAgenda from "@/content/research-agenda.json";

export {
  profile,
  experience,
  publications,
  activities,
  capabilities,
  researchAgenda,
};

const vercelHost =
  process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;

export const siteConfig = {
  name: profile.preferredName,
  legalName: profile.fullName,
  title: profile.position,
  description: `${profile.fullName} is a computational economics researcher combining econometrics, machine learning, data engineering, and research software to study complex economic systems.`,
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelHost ? `https://${vercelHost}` : "http://localhost:3000"),
  location: profile.location,
};
