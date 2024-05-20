"use client";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

type CategoriesItemsProps = {
    categories: string[];
};
export default function CategoriesItems({ categories }: CategoriesItemsProps) {
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get("category") as string;
    return (
        <>
            <div>
                <Button
                    variant={"link"}
                    className={clsx(
                        "h-9 underline-offset-4 hover:underline dark:hover:text-neutral-100 p-0",
                        {
                            "underline underline-offset-4": !currentCategory,
                        },
                    )}
                >
                    <Link href="/products" className="p-4">All</Link>
                </Button>
            </div>
            {categories?.map((category: string) => {
                const link = `/products?category=${category}`;
                return (
                    <div key={category}>
                        <Button
                            variant={"link"}
                            className={clsx(
                                "h-9 p-0 underline-offset-4 hover:underline dark:hover:text-neutral-100",
                                {
                                    "underline underline-offset-4":
                                        currentCategory === category,
                                },
                            )}
                        >
                            <Link href={link} className="p-4">
                                {" "}
                                {category}
                            </Link>
                        </Button>
                    </div>
                );
            })}
        </>
    );
}
