"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import {  columns } from "./columns";
import { Product } from "@/types/product";

interface ProductsClientProps {
    data: Product[];
}

export const ProductsClient: React.FC<ProductsClientProps> = ({ data }) => {
    const params = useParams();
    const router = useRouter();

    return (
        <>
            <div className="flex items-center flex-wrap gap-4 justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">
                        Total Products : {data.length}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Manage products for your store
                    </p>
                </div>
                <Button size={"sm"} onClick={() => router.push(`products/add`)}>
                    <Plus className="mr-2 h-4 w-4" /> Add New
                </Button>
            </div>
            <Separator />
            <DataTable searchKey="title" columns={columns} data={data} />
        </>
    );
};
