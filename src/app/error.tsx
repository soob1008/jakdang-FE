"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex items-center justify-center bg-white h-screen">
      <div className="flex flex-col items-center">
        <p className="text-xl font-bold">서버에서 오류가 발생했습니다.</p>
        <button
          className="bg-primary text-white px-4 py-2 mt-4 rounded text-sm"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          재시도
        </button>
      </div>
    </div>
  );
}
