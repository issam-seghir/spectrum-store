"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

type ButtonSize =
    | "default"
    | "sm"
    | "lg"
    | "lg-res"
    | "icon"
    | null
    | undefined;

const BackButton = ({
    route,
    size,
}: {
    route: string;
    size?: ButtonSize;
}) => {
    const router = useRouter();

    return (
        <Button size={size} onClick={() => router.push(route)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
        </Button>
    );
};

export default BackButton;
