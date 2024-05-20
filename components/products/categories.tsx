import CategoriesItems from "@/components/products/categories-items";
import { getCategories } from "@/lib/services";
import { ProductPageQueryParams } from "@/lib/types";

export default async function Categories({
    searchParams: { category: categoryParam },
}: ProductPageQueryParams) {
    const categories: string[] = await getCategories();

    return (
        <>
            <article className="border-2 bg-background-secondary block h-fit w-full flex-shrink-0 rounded-md md:w-48 lg:w-72 ">
                <h1 className="m-8 text-xl font-semibold">Categories</h1>
                <div className="m-8 flex flex-col">
                    <CategoriesItems categories={categories} />
                </div>
            </article>
        </>
    );
}
