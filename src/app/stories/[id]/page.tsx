import StoryPageWrapper from "@/src/components/wrappers/StoryPageWrapper";
// import {StoryObject} from "@/src/"
import { Metadata } from "next";
import { ApiResponse, Story } from "@/src/lib/types/api-types";
import { getStoriesStaticParams } from "@/src/utils/getStaticParamsItems";
import { metaJson } from "@/src/utils/metadata";
import JsonLd from "@/src/utils/SeoJSONServer";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> => {
  const storyId = (await params).id;

  let story: ApiResponse<Story> | null = null;

  try {
    const res = await fetch(
      `https://api.agcnewsnet.com/api/general/stories/${storyId}`
    );
    story = res.ok ? await res.json() : null;
  } catch (err) {
    console.error(err);
  }

  return {
    title: story?.data.title,
    description: story?.data.description,
    openGraph: {
      title: story?.data.title,
      description: story?.data.description,
      url: `https://agc-news-nelson-erege.vercel.app/stories/${story?.data.id}`,
      images: [story?.data.banner_image || "/images/placeholder-image"],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: story?.data.title,
      description: story?.data.description,
      images: [story?.data.banner_image || "/images/placeholder-image"],
    },
  };
};

export async function generateStaticParams() {
  const allLoadedStories = await getStoriesStaticParams();
  return allLoadedStories;
}

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
    throw new Error("Failed to load page data.");
  }

  console.log("date puclicsdsdad", story?.data?.category?.updated_at);

  return (
    <>
      {/* Server-rendered head for injection of json script */}
      <head>
        <meta
          name="google-site-verification"
          content="googlea264a916086e83a6"
        />
      </head>

      {/* Client-heavy wrapper */}
      <StoryPageWrapper storyId={storyId} />
    </>
  );
}
