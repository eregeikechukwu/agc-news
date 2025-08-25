import { ChevronRightIcon } from "lucide-react";

export default function H1({
  children,
  highlight,
  chevron = false,
}: {
  children: React.ReactNode;
  highlight: string;
  chevron?: boolean;
}) {
  return (
    <div className="text-[1.13rem] cursor-pointer group w-fit flex gap-4 relative px-3 font-bold">
      <p>{children}</p>
      <span
        className="absolute top-0 bottom-0 w-1 left-0"
        style={{ background: `${highlight}` }}
      ></span>
      {chevron && (
        <ChevronRightIcon className="group-hover:animate-ping" width={16} />
      )}
    </div>
  );
}
