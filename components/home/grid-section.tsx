import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function GridSection() {
    return (
        <section className="flex flex-auto items-center justify-center p-4 sm:p-8">
            <div className="grid  gap-4 lg:grid-cols-2">
                <div className="flex flex-row content-between gap-4 overflow-hidden rounded-lg border-2 bg-background-secondary dark:border-0">
                    <Image
                        src="/Contemplative Athleisure.jpg"
                        alt="Contemplative Athleisure"
                        loading="lazy"
                        width={250}
                        height={200}
                        className="w-36 transition-all sm:w-52 md:w-64"
                    />
                    <div className="flex flex-auto flex-col items-start justify-between gap-2 p-4 md:p-8">
                        <div className="space-y-2">
                            <h1 className="text-base font-bold sm:text-2xl md:text-3xl">
                                Men&apos;s Collection
                            </h1>
                            <h2 className="text-sm font-semibold sm:text-lg md:text-xl">
                                Collection
                            </h2>
                            <p className="line-clamp-2 text-xs sm:text-base">
                                Explore our dynamic Men&apos; Collection,
                                celebrating style and comfort.
                            </p>
                            <p className="line-clamp-2 text-xs sm:text-base">
                                Shop now and elevate your wardrobe with
                                fashion-forward ensembles!
                            </p>
                        </div>
                        <Button size="sm" className="">
                            <Link
                                href="/products?category=men%27s%20clothing"
                                className="text-xs sm:text-sm"
                            >
                                See products
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="grid grid-rows-[150px_1fr] gap-4 lg:grid-cols-2">
                    <div className="flex w-full flex-row gap-4 rounded-lg bg-background-secondary bg-purple-100">
                        <div className="m-8 flex flex-auto flex-col justify-center">
                            <h2 className="text-base font-semibold text-black">
                                24 Items
                            </h2>
                            <h1 className="text-xl font-bold text-black sm:text-3xl">
                                Bestsellers
                            </h1>
                        </div>
                    </div>

                    <div
                        className={`relative rounded-lg bg-background-secondary`}
                    >
                        <Image
                            src="/Vibrant Athletic Wear Collection.jpg"
                            alt="Vibrant Athletic Wear Collection"
                            loading="lazy"
                            fill // stretches the image to fit the container
                            className="rounded-lg object-cover"
                        />
                        <h1 className="relative ml-4 mt-16 inline-flex rounded bg-white bg-opacity-25 px-4 py-1 text-lg font-bold text-white">
                            New
                        </h1>
                        <h2 className="relative  ml-4 text-xl font-semibold text-white">
                            Collection
                        </h2>
                    </div>

                    <div className="relative col-span-2 min-h-min w-full rounded-lg bg-background-secondary ">
                        <Image
                            src="/Contemplative Fashion Portrait.jpg"
                            alt="Contemplative Fashion Portrait"
                            loading="lazy"
                            fill // stretches the image to fit the container
                            className="rounded-lg object-cover object-top"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
