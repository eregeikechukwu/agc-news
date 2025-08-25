import { Construction } from "lucide-react";

export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center text-gray-500">
      <Construction className="w-40 h-40 animate-bounce mb-4 text-gray-400" />
      <h1 className="text-lg font-semibold">This page is under Construction</h1>
    </div>
  );
}
