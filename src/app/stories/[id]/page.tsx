import Head from "next/head";
import StoryPageWrapper from "@/src/components/wrappers/StoryPageWrapper";
// import {StoryObject} from "@/src/"
import { Metadata } from "next";
import { ApiResponse, Story, StoryObject } from "@/src/lib/types/api-types";

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

  let story: ApiResponse<Story> | null = null;

  // Server-side fetch o fthe story of the story
  try {
    const res = await fetch(
      `https://api.agcnewsnet.com/api/general/stories/${storyId}`
    );
    story = res.ok ? await res.json() : null; // dont throw error
  } catch (error) {
   throw new Error("Failed to load page data.")
    story = null;
  }

  return (
    <>
      {/* Server-rendered head for WhatsApp/Facebook sharing */}
      <Head>
        <title>{story?.data?.title || "AGC News "}</title>
        <meta
          name="description"
          content={story?.data?.description || "Trending News on AGC"}
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content={story?.data?.title || "Latest News "}
        />
        <meta
          property="og:description"
          content={story?.data?.description || "Trending News on AGC"}
        />
        <meta
          property="og:image"
          content={story?.data?.banner_image || "/images/placeholder-image"}
        />
        <meta
          property="og:url"
          content={`https://agc-news-nelson-erege.vercel.app/stories/${storyId}`}
        />
        <meta property="og:type" content="article" />

        {/* Twitter card (optional) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={story?.data?.title || "Latest News "}
        />
        <meta
          name="twitter:description"
          content={story?.data?.description || "Trending News on AGC"}
        />
        <meta
          name="twitter:image"
          content={story?.data?.banner_image || "/images/placeholder-image"}
        />
      </Head>

      {/* Client-heavy wrapper */}
      <StoryPageWrapper storyId={storyId} />
    </>
  );
}
