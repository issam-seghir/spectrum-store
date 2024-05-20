import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
    return (
        <section className="block overflow-x-hidden md:h-[45hv] lg:h-[55hv] xl:h-[70vh]">
            <article className="relative flex h-auto max-h-full w-auto max-w-full flex-row">
                <Image
                    loading="eager"
                    width={1400}
                    height={500}
                    priority={true}
                    src="/Modern Chic Wardrobe with Industrial Flair.jpg"
                    alt="Modern Chic Wardrobe with Industrial Flair"
                    className="h-auto max-h-full max-w-full object-cover"
                />
                <Image
                    loading="eager"
                    width={600}
                    height={500}
                    priority={true}
                    src="/Urban Sophisticate.jpg"
                    alt="Urban Sophisticate"
                    className="h-auto max-h-full max-w-full object-cover"
                />

                <div className="absolute flex h-full w-full flex-col items-center justify-center gap-4 ">
                    <h1 className=" animate-text bg-gradient-to-r from-neutral-300 to-stone-400 bg-clip-text  text-3xl font-black text-transparent dark:bg-gradient-to-r dark:from-blue-800 dark:to-indigo-900 md:text-7xl lg:text-9xl">
                        Spectrum Store
                    </h1>

                    <h2
                        className="text- rounded-sm px-8 py-2 text-base  font-bold lg:px-24 lg:text-3xl"
                        style={{ color: "rgb(248, 250, 252)" }}
                    >
                        Your One-Stop Shop
                    </h2>
                    <Link
                        href="/products"
                        className={buttonVariants({ variant: "outline" })}
                    >
                        See All Products
                    </Link>
                </div>
            </article>
        </section>
    );
}
