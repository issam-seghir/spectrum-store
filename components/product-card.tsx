import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
    return (
        <article className="animate-fadeIn flex  h-full max-h-full w-full flex-col space-y-2 rounded-md bg-background-secondary p-4 shadow-sm transition-opacity">
            <Link
                href={`/products/${product.id}`}
                passHref
                className="flex max-h-48 flex-1 rounded bg-white py-4"
            >
                <Image
                    src={product.image}
                    width={300}
                    height={300}
                    alt={product.title}
                    className="mx-auto h-40 w-40 object-contain transition duration-300 ease-in-out group-hover:scale-105"
                />
            </Link>
            <div className="flex flex-1 flex-col justify-between gap-4">
                <Link
                    href={`/products/${product.id}`}
                    passHref
                    className="line-clamp-2 text-sm font-semibold"
                >
                    <abbr title={product.title} className="no-underline">
                        {product.title}
                    </abbr>
                </Link>
                <p className="line-clamp-4 text-xs">
                    <abbr
                        title={product.description}
                        className="font-normal text-stone-600 no-underline dark:text-white dark:text-opacity-70"
                    >
                        {product.description}
                    </abbr>
                </p>

                <span className="w-fit rounded-md bg-background p-2 text-xs font-medium capitalize">
                    {product.category}
                </span>

                <div className="flex items-baseline justify-between">
                    <p className="text-base font-bold leading-none">
                        ${product.price}
                    </p>
                    <div className="flex items-center justify-between gap-1">
                        <Button
                            variant="outline"
                            className="h-5 w-5 rounded-full p-0 "
                            size={"sm"}
                        >
                            <Minus className="h-4 w-4" />
                        </Button>
                        <span>0</span>
                        <Button
                            variant="outline"
                            className="h-5 w-5 rounded-full p-0"
                            size={"sm"}
                        >
                            <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </article>
    );
}
