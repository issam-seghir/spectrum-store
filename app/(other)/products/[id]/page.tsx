import { Button } from "@/components/ui/button";
import { getProductById } from "@/lib/services";
import { Product } from "@/lib/types";
import { ArrowLeft, Minus, Plus, ShoppingCart, Star, StarHalf } from "lucide-react";
import { ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";


type Props = {
    params: { id: string };
};

//? This function is called during the build (build time) and generates the metadata for the page
//? metadata is used by search engines and social media platforms to display information about the page
//? this will improve the SEO of the page
export async function generateMetadata(
    { params: { id } }: Props,
    parent: ResolvingMetadata,
) {
    const product = await getProductById(id);
    const previousImages = (await parent).openGraph?.images || [];

    return {
        title: `Spectrum - ${product?.title}`,
        description: product?.description,
        openGraph: {
            images: [product?.image, ...previousImages],
        },
    };
}

export default async function ProductDetail({ params: { id } }: Props) {
    const product: Product | null = await getProductById(id);

    if (!product) {
notFound()
    }

    return (
        <>
            <div className="flex flex-col justify-center gap-4 justify-self-center min-[460px]:p-5  lg:p-20">
                <Link
                    href="/products"
                    passHref
                    className="gap-2 p-3 text-base font-medium text-primary min-[460px]:p-0 md:flex"
                >
                    <ArrowLeft />
                    Back to products
                </Link>
                <div className=" flex flex-auto flex-col items-center justify-center gap-10 p-3 min-[460px]:p-0  md:flex-row ">
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={400}
                        height={400}
                        className="max-w-[240px] rounded-2xl bg-white object-contain p-8 sm:max-w-[350px]"
                    />
                    <div className="flex h-full max-w-xl flex-auto flex-col gap-10  sm:justify-center ">
                        <div className="flex flex-col gap-2">
                            <span className="dark:bg-background-secondary w-fit rounded-md bg-[#DAC0A3] p-2 text-sm font-medium capitalize">
                                {product.category}
                            </span>

                            <div className="flex">
                                {[
                                    ...Array(Math.floor(product.rating.rate)),
                                ].map((_, i) => (
                                    <span key={i}>
                                        <Star className="fill-[#DAC0A3] stroke-none dark:fill-white " />
                                    </span>
                                ))}
                                {product.rating.rate % 1 !== 0 && (
                                    <StarHalf className="border-none fill-[#DAC0A3] stroke-none dark:fill-white" />
                                )}
                                <span className="ml-2">
                                    ({product.rating.count} ratings)
                                </span>
                            </div>
                            <h1 className="text-md font-bold sm:text-2xl md:text-4xl">
                                {product.title}
                            </h1>

                            <p className="text-xs lg:text-base">
                                {product.description}
                            </p>
                        </div>

                        <p className="text-2xl font-bold">${product.price}</p>
                        <div className="flex items-center justify-center gap-4 ">
                            <Button
                                variant="default"
                                size="lg-res"
                                className="px-4  min-[460px]:px-8"
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <span>
                                <Button
                                    variant="default"
                                    size="lg-res"
                                    className="sm:max-w-fit"
                                >
                                    <ShoppingCart className="mr-4" />
                                    Add to cart
                                </Button>
                            </span>

                            <Button
                                variant="default"
                                size="lg-res"
                                className="px-4  min-[460px]:px-8"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
