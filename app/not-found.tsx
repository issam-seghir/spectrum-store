import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex h-[100dvh] w-full flex-col items-center justify-center gap-1 text-2xl font-bold">
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
            <Button variant={"link"}>
                <Link href="/" className="rounded-md border-2 p-1">
                    Return Home
                </Link>
            </Button>
        </div>
    );
}
