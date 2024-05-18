import { getProducts } from "@/products-service";
import { Product, ProductPageQueryParams } from "@/types";
// import ProductCard from "./product-card";
import ProductCard from "@/components/product-card";

export default async function ProductList({
    searchParams,
}: ProductPageQueryParams) {
    const products: Product[] = await getProducts(searchParams.category,searchParams.query);
    return (
        <>
            <article className="block space-y-5">
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                    {products?.map((product: Product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </article>
        </>
    );
}
