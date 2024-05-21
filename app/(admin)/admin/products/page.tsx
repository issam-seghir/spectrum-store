
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

import { getProducts } from "@/lib/services";
import { Product, ProductPageQueryParams } from "@/lib/types";
// import ProductCard from "./product-card";
import ProductCard from "@/components/products/product-card";
import {ProductsClient} from "@/components/admin/admin-products";

async function AdminProducts({ searchParams }: ProductPageQueryParams) {
    const products: Product[] = await getProducts(
        searchParams.category,
        searchParams.query,
    );
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductsClient data={products} />
            </div>
        </div>
    );
}

export default AdminProducts;
