import Head from "next/head";
import StoryPageWrapper from "@/src/components/wrappers/StoryPageWrapper";
import { Metadata } from "next";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> => {
  const storyId = (await params).id;

  const res = await fetch(
    `https://api.agcnewsnet.com/api/general/stories/${storyId}`
  );
  const story = await res.json();

  return {
    title: story.data.title,
    description: story.data.description,
    openGraph: {
      title: story.data.title,
      description: story.data.description,
      url: `https://agc-news-nelson-erege.vercel.app/stories/${story.data.id}`,
      images: [story.data.banner_image],
      type: "article",
    },
  };
};

export default async function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: storyId } = await params;

  // Server-side fetch of the story
  const res = await fetch(
    `https://api.agcnewsnet.com/api/general/stories/${storyId}`
  );
  if (!res.ok) throw new Error("Failed to fetch story");
  const story = await res.json();

  return (
    <>
      {/* Server-rendered head for WhatsApp/Facebook sharing */}
      <Head>
        <title>{story.title}</title>
        <meta name="description" content={story.data.description} />

        {/* Open Graph */}
        <meta property="og:title" content={story.data.title} />
        <meta property="og:description" content={story.data.description} />
        <meta property="og:image" content={story.data.banner_image} />
        <meta
          property="og:url"
          content={`https://agc-news-nelson-erege.vercel.app/stories/${storyId}`}
        />
        <meta property="og:type" content="article" />

        {/* Twitter card (optional) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={story.data.title} />
        <meta name="twitter:description" content={story.data.description} />
        <meta name="twitter:image" content={story.data.banner_image} />
      </Head>

      {/* Client-heavy wrapper */}
      <StoryPageWrapper storyId={storyId} />
    </>
  );
}
