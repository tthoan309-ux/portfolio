import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Inter, JetBrains_Mono } from "next/font/google";
import { profile, siteConfig } from "@/data/site";
import "./globals.css";

const heading = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex",
  display: "swap",
});
const body = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Marcuz — Economics, AI & Public Policy",
    template: "%s — Marcuz",
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  keywords: [
    "International Economics",
    "Artificial Intelligence",
    "Econometrics",
    "Climate Economics",
    "Innovation Economics",
    "Data Science",
    "Public Policy",
  ],
  authors: [{ name: profile.fullName }],
  creator: profile.fullName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Marcuz Research",
    title: "Marcuz — Economics, AI & Public Policy",
    description: siteConfig.description,
    images: [
      {
        url: "/og.png",
        width: 1732,
        height: 909,
        alt: "Marcuz — Economics, AI & Public Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcuz — Economics, AI & Public Policy",
    description: siteConfig.description,
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
    { media: "(prefers-color-scheme: dark)", color: "#020617" },
  ],
  colorScheme: "light dark",
};

const themeScript = `try{const t=localStorage.getItem('theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.fullName,
    alternateName: profile.preferredName,
    nationality: profile.nationality,
    homeLocation: profile.location,
    jobTitle: profile.position,
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Foreign Trade University",
    },
    knowsAbout: [
      "International Economics",
      "Artificial Intelligence",
      "Econometrics",
      "Climate Economics",
      "Cryptography",
    ],
    url: siteConfig.url,
  };
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${heading.variable} ${body.variable} ${mono.variable}`}>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
