"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";
import { Product } from "@/lib/types";
import Image from "next/image";

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "title",
        header: "Name",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "rating",
        header: "Rating",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "category",
        header: "Category",
    },
    {
        accessorKey: "quantity",
        header: "Quantity",
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                <Image
                    src={row.original.image}
                    alt={row.original.title}
                    width={400}
                    height={400}
                    className="max-w-[240px] rounded-2xl bg-white object-contain p-8 sm:max-w-[350px]"
                />
            </div>
        ),
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />,
    },
];
