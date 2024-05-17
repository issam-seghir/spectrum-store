import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <section className="block overflow-x-hidden md:h-[45hv] lg:h-[55hv] xl:h-[70vh]">
            <article className="relative flex h-auto max-h-full w-auto max-w-full flex-row">
                <Image
                    loading="eager"
                    width={1400}
                    height={500}
                    priority={true}
                    src="https://assets.lummi.ai/assets/QmXarCVzUC6q6QGL56JJkWW7NucjkDrP4q6nsVQ72yzJ7q?auto=format&w=1400"
                    alt="Girl Rockstar"
                    className="h-auto max-h-full max-w-full object-cover"
                />
                <Image
                    loading="eager"
                    width={600}
                    height={500}
                    priority={true}
                    src="https://assets.lummi.ai/assets/QmS8NLeQhVFxpcJZpKevcvgXUdhFmKSqA3yh9KcfLP7Lkg?auto=format&w=600"
                    alt="Girl Rockstar"
                    className="h-auto max-h-full max-w-full object-cover"
                />

                <div className="absolute flex h-full w-full flex-col items-center justify-center gap-1">
                    <h1 className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text font-black text-transparent md:text-7xl lg:text-9xl">
                        Spectrum Store
                    </h1>

                    <h2 className="bg-backgroundElement px-8 text-base font-bold lg:px-24 lg:text-3xl">
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
