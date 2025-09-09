export default function HorizontalScrollGridContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="gap-[1.06rem] md:w-full w-max auto-cols-[20rem]  md:grid-rows-[repeat(auto-fill,24rem)] grid-flow-col    grid md:grid-cols-[repeat(auto-fill,minmax(22%,1fr))]">
      {children}
    </div>
  );
}
