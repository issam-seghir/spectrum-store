// import Categories from "@/components/product-page/categories";
import Categories from "@/components/categories";
import ProductList from "@/components/product-list";
import { ProductPageQueryParams } from "@/types";
import clsx from "clsx";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Sonner - Products",
    description: "Sonner find everything you need",
};

const skeleton = "mb-3 h-4 w-5/6 animate-pulse rounded";
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
                    <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
                }
            >
                <ProductList searchParams={searchParams} />
            </Suspense>
        </section>
    );
}
