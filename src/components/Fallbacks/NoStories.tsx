import { Newspaper } from "lucide-react"; // Replace or remove icon as needed

export default function NoStories({
  title,
  message = "Please check back later. We're always updating the latest stories!",
}: {
  title: string;
  message?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
      <Newspaper className="w-40 h-40 animate-bounce mb-4 text-gray-400" />
      <h2 className="text-lg font-semibold">No {title} stories for now</h2>
      <p className="text-sm mt-2 max-w-xs">{message}</p>
    </div>
  );
}
