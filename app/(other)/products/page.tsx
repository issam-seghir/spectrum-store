// import Categories from "@/components/product-page/categories";
import Categories from "@/components/categories";
import ProductList from "@/components/product-list";
import { Skeleton } from "@/components/ui/skeleton";
import { ProductPageQueryParams } from "@/types";
import clsx from "clsx";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Sonner - Products",
    description: "Sonner find everything you need",
};

const skeleton = "mb-3 h-4 w-5/6 animate-pulse rounded";
const skeletonProduct = "mb-3 h-25 w-5/6 animate-pulse rounded";
const activeAndTitles = "bg-neutral-800 dark:bg-neutral-300";
const items = "bg-neutral-400 dark:bg-neutral-700";

export default async function ProductsPage({
    searchParams,
}: ProductPageQueryParams) {
    return (
        <section className="m-4 flex flex-auto flex-col gap-4 md:flex-row">
            <Suspense
                fallback={
                    <div className="col-span-2 hidden h-[400px] w-full flex-none py-4 md:w-48 lg:block lg:w-72">
                        <div className={clsx(skeleton, activeAndTitles)} />
                        <div className={clsx(skeleton, activeAndTitles)} />
                        <div className={clsx(skeleton, items)} />
                        <div className={clsx(skeleton, items)} />
                        <div className={clsx(skeleton, items)} />
                        <div className={clsx(skeleton, items)} />
                    </div>
                }
            >
                <Categories searchParams={searchParams} />
            </Suspense>
            <Suspense
                fallback={
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    <div className="flex flex-col space-y-5">
                        <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                           <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                            </div>
                            <div>
                                <Skeleton className="h-14 w-[200px]" />
                            </div>

                        </div>
                                    <Skeleton className="h-8 w-[80px]" />
                    </div>
                    <div className="flex flex-col space-y-5">
                        <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                           <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                            </div>
                            <div>
                                <Skeleton className="h-14 w-[200px]" />
                            </div>

                        </div>
                                    <Skeleton className="h-8 w-[80px]" />
                    </div>
                    <div className="flex flex-col space-y-5">
                        <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                           <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                            </div>
                            <div>
                                <Skeleton className="h-14 w-[200px]" />
                            </div>

                        </div>
                                    <Skeleton className="h-8 w-[80px]" />
                    </div>
                    <div className="flex flex-col space-y-5">
                        <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                           <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                            </div>
                            <div>
                                <Skeleton className="h-14 w-[200px]" />
                            </div>

                        </div>
                                    <Skeleton className="h-8 w-[80px]" />
                    </div>
                    <div className="flex flex-col space-y-5">
                        <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                           <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                            </div>
                            <div>
                                <Skeleton className="h-14 w-[200px]" />
                            </div>

                        </div>
                                    <Skeleton className="h-8 w-[80px]" />
                    </div>
                    <div className="flex flex-col space-y-5">
                        <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                           <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                            </div>
                            <div>
                                <Skeleton className="h-14 w-[200px]" />
                            </div>

                        </div>
                                    <Skeleton className="h-8 w-[80px]" />
                    </div>
                    <div className="flex flex-col space-y-5">
                        <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                           <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                            </div>
                            <div>
                                <Skeleton className="h-14 w-[200px]" />
                            </div>

                        </div>
                                    <Skeleton className="h-8 w-[80px]" />
                    </div>
                    <div className="flex flex-col space-y-5">
                        <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                           <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                            </div>
                            <div>
                                <Skeleton className="h-14 w-[200px]" />
                            </div>

                        </div>
                                    <Skeleton className="h-8 w-[80px]" />
                    </div>
                    <div className="flex flex-col space-y-5">
                        <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                           <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                            </div>
                            <div>
                                <Skeleton className="h-14 w-[200px]" />
                            </div>

                        </div>
                                    <Skeleton className="h-8 w-[80px]" />
                    </div>
                    <div className="flex flex-col space-y-5">
                        <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                           <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                            </div>
                            <div>
                                <Skeleton className="h-14 w-[200px]" />
                            </div>

                        </div>
                                    <Skeleton className="h-8 w-[80px]" />
                    </div>
                    <div className="flex flex-col space-y-5">
                        <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                           <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                            </div>
                            <div>
                                <Skeleton className="h-14 w-[200px]" />
                            </div>

                        </div>
                                    <Skeleton className="h-8 w-[80px]" />
                    </div>
                    <div className="flex flex-col space-y-5">
                        <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                           <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                            </div>
                            <div>
                                <Skeleton className="h-14 w-[200px]" />
                            </div>

                        </div>
                                    <Skeleton className="h-8 w-[80px]" />
                    </div>
                    <div className="flex flex-col space-y-5">
                        <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                           <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                            </div>
                            <div>
                                <Skeleton className="h-14 w-[200px]" />
                            </div>

                        </div>
                                    <Skeleton className="h-8 w-[80px]" />
                    </div>
                    <div className="flex flex-col space-y-5">
                        <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                           <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                            </div>
                            <div>
                                <Skeleton className="h-14 w-[200px]" />
                            </div>

                        </div>
                                    <Skeleton className="h-8 w-[80px]" />
                    </div>
                    <div className="flex flex-col space-y-5">
                        <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                           <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                            </div>
                            <div>
                                <Skeleton className="h-14 w-[200px]" />
                            </div>

                        </div>
                                    <Skeleton className="h-8 w-[80px]" />
                    </div>
                    <div className="flex flex-col space-y-5">
                        <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                           <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                            </div>
                            <div>
                                <Skeleton className="h-14 w-[200px]" />
                            </div>

                        </div>
                                    <Skeleton className="h-8 w-[80px]" />
                    </div>
                    <div className="flex flex-col space-y-5">
                        <Skeleton className="h-[200px] w-[250px] rounded-xl" />
                        <div className="space-y-2">
                           <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                    <Skeleton className="h-4 w-[200px]" />
                            </div>
                            <div>
                                <Skeleton className="h-14 w-[200px]" />
                            </div>

                        </div>
                                    <Skeleton className="h-8 w-[80px]" />
                    </div>
                    </div>
                }
            >

                <ProductList searchParams={searchParams} />
            </Suspense>
        </section>
    );
}
