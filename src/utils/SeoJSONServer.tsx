"use client";

import { useEffect, useState } from "react";

type JsonLdProps = {
  title: string;
  image?: string;
  type?: "website" | "article";
  datePublished?: string;
};

export default function JsonLd({
  title,
  image,
  type = "website",
  datePublished,
}: JsonLdProps) {
  const [json, setJson] = useState("");

  useEffect(() => {
    const safeDate = datePublished
      ? datePublished.split("T")[0]
      : new Date().toISOString().split("T")[0];

    const data = {
      "@context": "https://schema.org",
      "@type": type,
      headline: title,
      image: [image ?? "/default-og.png"],
      datePublished: safeDate,
      author: { "@type": "Organization", name: "Nelson Erege" },
    };

    setJson(JSON.stringify(data));
  }, [title, image, type, datePublished]);

  if (!json) return null; // Avoid rendering before data is ready

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
