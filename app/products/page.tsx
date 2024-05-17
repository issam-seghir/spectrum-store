// import Categories from "@/components/product-page/categories";
import ProductList from "@/components/product-list";
import { ProductPageQueryParams } from "@/types";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sonner - Products",
    description: "Sonner find everything you need",
};

export default async function ProductsPage({
    searchParams,
}: ProductPageQueryParams) {
    return (
        <section className="m-4 flex flex-auto flex-col gap-4 sm:flex-row">
            {/* <Categories searchParams={searchParams} /> */}
            <ProductList searchParams={searchParams} />
        </section>
    );
}
