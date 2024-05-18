import { Button } from "@/components/ui/button";
import { getCategories } from "@/products-service";
import { ProductPageQueryParams } from "@/types";
import Link from "next/link";

export default async function Categories({
    searchParams: { category: categoryParam },
}: ProductPageQueryParams) {
    const categories: string[] = await getCategories();

    return (
        <>
            <article className="bg-background-secondary block h-fit w-full flex-shrink-0 rounded-md md:w-48 lg:w-72 ">
                <h1 className="m-8 text-xl font-semibold">Categories</h1>
                <div className="m-8 flex flex-col">
                    <div>
                        <Button variant={"link"} className="h-9">
                            <Link href="/products">All</Link>
                        </Button>
                    </div>
                    {categories?.map((category: string) => {
                        const link = `/products?category=${category}`;
                        return (
                            <div key={category}>
                                <Button variant={"link"} className="h-9">
                                    <Link href={link}> {category}</Link>
                                </Button>
                            </div>
                        );
                    })}
                </div>
            </article>
        </>
    );
}
