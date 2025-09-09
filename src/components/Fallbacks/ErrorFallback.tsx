"use client";

import { AlertTriangle, WifiOffIcon } from "lucide-react";
import Button from "@/src/components/UI/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ErrorFallback({
  message = "Something went wrong fetching data.",
}) {
  const [offline, setIsOffline] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!navigator.onLine) {
      setIsOffline(true);
    } else setIsOffline(false);
  }, [navigator.onLine]);

  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center animate-fade-in">
      {offline ? (
        <WifiOffIcon className="text-gray-500 animate-pulse w-40 h-40 mb-4" />
      ) : (
        <AlertTriangle className="text-red-500 animate-pulse w-40 h-40 mb-4" />
      )}
      <h2 className="text-xl font-semibold text-red-600 mb-2">Oops!</h2>
      <p className="text-sm text-gray-600 max-w-md mb-6">
        {offline ? (
          "Check your internet connection and refresh"
        ) : (
          <span>
            {message} <br />
            You can try refreshing the page or going back.
          </span>
        )}
      </p>
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => window.location.reload()}>
          🔄 Refresh
        </Button>
        <Button variant="ghost" onClick={() => router.back()}>
          🔙 Go Back
        </Button>
      </div>
    </div>
  );
}
