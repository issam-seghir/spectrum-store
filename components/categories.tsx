import { getCategories } from "@/products-service";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { ProductPageQueryParams } from "@/types";
import { randomUUID } from "crypto";

export default async function Categories({
    searchParams: { category: categoryParam },
}: ProductPageQueryParams) {
    const categories: string[] = await getCategories();

    return (
        <>
            <article className="block h-fit w-full flex-shrink-0 rounded-md bg-backgroundElement sm:w-80">
                <h1 className="m-8 text-xl font-semibold">Categories</h1>
                <div className="m-8 flex flex-col gap-2">
                    <div key={randomUUID()}>
                        <Link href={"/products"}>
                            <Checkbox
                                id={randomUUID()}
                                checked={
                                    categoryParam === undefined
                                }
                            />
                            <label
                                htmlFor={randomUUID()}
                                className="ml-4 cursor-pointer text-sm font-medium capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                All
                            </label>
                        </Link>
                    </div>
                    {categories?.map((category: string) => {
                        const id = randomUUID();
                        const link = `/products?category=${category}`;
                        return (
                            <div key={id}>
                                <Link href={link}>
                                    <Checkbox
                                        id={id}
                                        checked={
                                            categoryParam === category ||
                                            categoryParam === undefined
                                        }
                                    />
                                    <label
                                        htmlFor={id}
                                        className="ml-4 cursor-pointer text-sm font-medium capitalize leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {category}
                                    </label>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            </article>
        </>
    );
}
