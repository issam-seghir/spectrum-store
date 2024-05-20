"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";

import {  columns } from "./columns";
import { Product } from "@/lib/types";

interface ProductsClientProps {
    data: Product[];
}

export const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
    const params = useParams();
    const router = useRouter();

    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Products ${data.length}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Manage products for your store
                    </p>
                </div>
                <Button
                    onClick={() =>
                        router.push(`/${params.storeId}/products/new`)
                    }
                >
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="name" columns={columns} data={data} />
            <div>
                <h2 className="text-3xl font-bold tracking-tight">API</h2>
                <p className="text-sm text-muted-foreground">
                    API Calls for Products
                </p>
            </div>
            <Separator />
            <ApiList entityName="products" entityIdName="productId" />
        </>
    );
};
