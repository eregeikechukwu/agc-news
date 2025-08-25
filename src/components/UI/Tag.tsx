export default function Tag({
  children,
  variant = "light",
}: {
  children: React.ReactNode;
  variant?: "dark" | "light";
}) {
  const color = variant === "light" ? "text-[#DCDCDC]" : "text-[#5A5A5A]";

  return (
    <div className="flex items-center gap-2">
      <span className="rounded-full h-[0.63rem] w-[0.63rem] bg-red "></span>
      <p className={`text-[0.81rem] ${color}`}>{children}</p>
    </div>
  );
}
