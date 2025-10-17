import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

export const openGraph: OpenGraph = {
  title: "AGC News – Stay Updated",
  description: "Latest news and insights across Africa on AGC News.",
  url: "https://agc-news-nelson-erege.vercel.app",
  siteName: "AGC News",
  images: [
    {
      url: "https://agc-news-nelson-erege.vercel.app/opengraph-image.png",
      width: 1200,
      height: 630,
      alt: "AGC News",
    },
  ],
  type: "website",
};

export const metaJson = (
  title = "AGC News",
  image = "https://agc-news-nelson-erege.vercel.app/opengraph-image.png",
  type = "website",
  datePublished = "2025-07-07"
) => {
  //   console.log("eveyr fucking stuff", title, image, type, datePublished);
  const safeDate = datePublished
    ? datePublished.split("T")[0]
    : new Date().toISOString().split("T")[0];
  return {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": type,
      headline: `${title}`,
      image: [`${image}`],
      datePublished: safeDate,
      author: { "@type": "Organization", name: "Nelson Erege" },
    }),
  };
};

export const alternates = {
  canonical: "https://agc-news-nelson-erege.vercel.app",
};
export const other = {
  robots: "index, follow",
  language: "en",
};

const twitter = {
  card: "summary_large_image",
  title: "AGC News – Stay Updated",
  description: "Latest news and insights across Africa.",
  images: ["https://agc-news-nelson-erege.vercel.app/opengraph-image.png"],
  site: "@AGCNews",
  creator: "@EregeNelso40316",
};

export const main_metadata: Metadata = {
  title: {
    default: "AGC",
    template: "%s - AGC",
  },
  description:
    "Stay updated with the latest news and insights around Africa on AGC news",
  openGraph: openGraph,
  twitter: twitter,
  alternates: alternates,
  other: other,
};
