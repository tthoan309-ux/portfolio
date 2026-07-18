import { siteConfig } from "@/data/site";
import { getPosts } from "@/lib/content";

function escapeXml(value: string) {
  return value.replace(
    /[<>&'\"]/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '\"': "&quot;",
      })[char] ?? char,
  );
}

export function GET() {
  const posts = getPosts();
  const items = posts
    .map(
      (post) =>
        `<item><title>${escapeXml(post.title)}</title><link>${siteConfig.url}/blog/${post.slug}</link><guid>${siteConfig.url}/blog/${post.slug}</guid><pubDate>${new Date(post.date).toUTCString()}</pubDate><description>${escapeXml(post.excerpt)}</description><category>${escapeXml(post.category)}</category></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Tran Thuan Hoan — Research Notes</title><link>${siteConfig.url}/blog</link><description>${escapeXml(siteConfig.description)}</description><language>en</language>${items}</channel></rss>`;
  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
