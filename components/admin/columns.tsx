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
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                <span className="text-lg font-semibold">
                    ${row.original.price}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "rating",
        header: "Rating",
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                <span className="text-lg font-semibold">
                    {row.original.rating.rate}
                </span>
            </div>
        ),
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
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                <Image
                    src={row.original.image}
                    alt={row.original.title}
                    width={150}
                    height={150}
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
