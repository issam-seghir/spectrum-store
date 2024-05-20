"use client";
import { useEffect } from "react";


export default function Error(
    { reset }: { reset: () => void },
    error: Error & { digest?: string },
) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);
    return (
        <div className="flex h-[100dvh] w-full items-center justify-center">
            <div className="m-0  max-w-xl flex-col rounded-lg border  p-8 md:p-12">
                <h2 className="text-xl font-bold">Oh no!</h2>
                <p className="my-2">
                    There was an issue with our storefront. This could be a
                    temporary issue, please try your action again.
                </p>
                <button
                    className="mx-auto mt-4 flex w-full items-center justify-center rounded-full  p-4 tracking-wide  hover:opacity-90"
                    onClick={() => reset()}
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}
