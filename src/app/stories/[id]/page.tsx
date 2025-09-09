import StoryPageWrapper from "@/src/components/wrappers/StoryPageWrapper";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: storyId } = await params;

  return <StoryPageWrapper storyId={storyId} />;
}
