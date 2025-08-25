import {
  TopStories,
  LatestNews,
  EditorsPicks,
  CategoriesSection,
  FeaturedStories,
  MissedStories,
  NewsLetter,
} from "../components/sections";
import MiddlePageAd from "./features/ads/MiddlePageAd";

export default function Home() {
  return (
    <div>
      <TopStories />
      <LatestNews />
      <MiddlePageAd />
      <EditorsPicks />
      <CategoriesSection />
      <FeaturedStories />
      <MissedStories />
      <NewsLetter />
      {/* All to JESUS, through Mary our mother! Through Jesus Christ our Lord! */}
      {/* St.Gregory, Ora pronobis */}
    </div>
  );
}
