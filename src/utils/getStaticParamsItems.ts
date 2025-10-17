import { Story } from "../lib/types/api-types";
import { categoryIds } from "./appHeaderItems";

export const getStoriesStaticParams: () => Promise<
  { id: string }[]
> = async () => {
  // Safe fetch helper — handles network and response errors gracefully
  const safeFetch = async (url: string) => {
    try {
      // Fetch the data (no-store disables caching, ensures fresh data)
      const response = await fetch(url, { next: {revalidate: 3600} });

      // Throw an error if response status is not OK (200–299)
      if (!response.ok)
        throw new Error(`Failed to fetch ${url}: ${response.statusText}`);

      // Parse JSON and return it
      return await response.json();
    } catch (err) {
      // Log any errors (network, parsing, etc.)
      console.error(err);
      // Return null so Promise.all can still resolve instead of rejecting
      throw err;
    }
  };

  const allStoriesGroup = await safeFetch(
    "https://api.agcnewsnet.com/api/general/stories?page=1&per_page=300"
  );

  /*
  // Run multiple fetches concurrently using Promise.all

  const storyGroups = await Promise.all([
    // Fetch Editor’s Picks
    safeFetch(
      "https://api.agcnewsnet.com/api/general/editor-picks?page=1&per_page=20"
    ),

    // Fetch Latest Stories
    safeFetch(
      "https://api.agcnewsnet.com/api/general/stories/latest-stories?page=1&per_page=8"
    ),

    // Fetch Missed Stories
    safeFetch(
      "https://api.agcnewsnet.com/api/general/stories/missed-stories?page=1&per_page=4"
    ),

    // Fetch Top Stories
    safeFetch("https://api.agcnewsnet.com/api/general/top-stories"),

    // Fetch multiple categories in parallel (nested Promise.all to resolve all)

    ...(await Promise.all(
      categoryIds.map((id) =>
        safeFetch(
          `https://api.agcnewsnet.com/api/general/categories/${id}/stories?page=1&per_page=15`
        )
      )
    )),
  ]);

  // 🔥 Flatten all stories from every group into a single clean array
  const allStories = storyGroups
    .filter(Boolean) // remove any nulls from failed requests
    .flatMap((group) =>
      Array.isArray(group) ? group : group?.data?.data ?? []
    )
    .map((story) => ({ id: story.id.toString() })); // normalize to { id: ... }

  console.log("✅ Unified All Stories:", allStories);
  */
  // 🔥 Flatten all stories from every group into a single clean array
  const allStories = allStoriesGroup.data.data.map((story: Story) => ({
    id: story.id.toString(),
  }));

  return allStories ?? [];
};
