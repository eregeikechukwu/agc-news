import "@/src/styles/skeleton.scss";
import styles from "../sections/TopStories/Top-stories.module.scss";

export default function StoryCardSkeleton() {
  return (
    <div className={styles.storiesgrid}>
      {Array.from({ length: 3 }).map((_, idx) => (
        <div
          key={idx}
          className="skeleton_shimmer"
          style={{ minHeight: "150px" }}
        >
          <div className="absolute  bottom-[5%] left-[1.06rem] right-[1.06rem] h-6 bg-gray-400 rounded"></div>
        </div>
      ))}
    </div>
  );
}
