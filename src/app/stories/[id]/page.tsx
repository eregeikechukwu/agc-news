import StoryPageWrapper from "@/src/components/wrappers/StoryPageWrapper";

export default async function StoryPage({ params }) {
  const storyId = params.id;

  return <StoryPageWrapper storyId={storyId} />;
}
