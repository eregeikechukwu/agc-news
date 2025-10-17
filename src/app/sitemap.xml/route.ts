import { categoryNames } from "@/src/utils/appHeaderItems";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://agc-news-nelson-erege.vercel.app";

export async function GET() {
  const res = await fetch(
    "https://api.agcnewsnet.com/api/general/stories?page=1&per_page=1000"
  );
  const stories = await res.json();

  const urls = stories.data.data.map((story: { id: string }) => {
    return `${baseURL}/stories/${story.id}`;
  });
  const categoryUrls = categoryNames.map((name: string) => {
    return `${baseURL}/categories/${name}`;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseURL}/</loc>
  </url>
    ${urls
      .map((url: string) => {
        return `
      <url>
        <loc>${url}</loc>
      </url>
    `;
      })
      .join("")}
${categoryUrls
  .map((url: string) => {
    return `
        <url>
            <loc>${url}</loc>
        </url>`;
  })
  .join("")}
  </urlset>
`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
