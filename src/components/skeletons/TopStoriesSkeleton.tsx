import "@/src/styles/sass/skeleton.scss";
import styles from "../sections/TopStories/Top-stories.module.scss";

export default function StoryCardSkeleton() {
  return (
    <div className={`${styles.storiesgrid} ${styles.storiesgridskeleton}`}>
      {Array.from({ length: 3 }).map((_, idx) => (
        <div key={idx} className="max-md:flex flex-col gap-2">
          <div
            key={idx}
            className="skeleton_shimmer md:h-full"
            style={{ minHeight: "190px" }}
          >
            <div className="absolute bottom-[5%] left-[1.06rem] right-[1.06rem] h-6 bg-gray-400 rounded"></div>
          </div>
          <div className="md:hidden mb-4 w-full">
            <div className="w-full skeleton_shimmer mb-1 h-5 bg-gray-300 rounded"></div>
            <div className="w-full skeleton_shimmer mb-1 h-5 bg-gray-300 rounded"></div>
            <div className="w-full skeleton_shimmer mb-1 h-5 bg-gray-300 rounded"></div>
            <div className="w-12 skeleton_shimmer h-5 bg-gray-300 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
