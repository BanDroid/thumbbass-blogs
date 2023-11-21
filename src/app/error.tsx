"use client"; // Error components must be Client Components

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
    setTimeout(() => {
      window?.location?.reload();
    }, 1000);
  }, [error]);

  return (
    // <div className="flex flex-col gap-2 items-center justify-center p-4">
    //   <h2>Something went wrong!</h2>
    //   <button
    //     className="btn btn-primary btn-sm md-ripples ripples-dark"
    //     onClick={
    //       // Attempt to recover by trying to re-render the segment
    //       () => reset()
    //     }
    //   >
    //     Try again
    //   </button>
    // </div>
    <></>
  );
}
