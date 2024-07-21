"use client";

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

import { AlertModal } from "@/components/ui/alert-modal";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { deleteProduct } from "@/lib/actions";
import { Product } from "@/types/product";
import Image from "next/image";
interface CellActionProps {
    data: Product;
}

export const CellAction: React.FC<CellActionProps> = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const params = useParams();

    const onConfirm = async () => {
        try {
            setLoading(true);
            toast.promise(
                deleteProduct(data.id.toString()),
                {
                    loading: "Deleting...🧨",
                    success: (res) => (
                        <div className="w-full flex-1 p-4">
                            <div className="flex items-start">
                                <div className="flex-shrink-0 pt-0.5">
                                    <Image
                                        className="h-20 w-20 rounded-md"
                                        width={80}
                                        height={80}
                                        src={res.image}
                                        alt={res.title}
                                    />
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-gray-900">
                                        Product {res.id} -{" "}
                                        {res.title.slice(0, 10)}{" "}
                                        <span className="font-bold text-red-700">
                                            Deleted
                                        </span>
                                    </p>
                                    <p className="mt-1 text-sm text-gray-500">
                                        Category: {res.category}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ),
                    error: (err) => (
                        <b>
                            Could not delete product. Error:{" "}
                            {err.message.toString()}
                        </b>
                    ),
                },
                {
                    style: {
                        minWidth: "250px",
                    },
                    success: {
                        duration: 3000,
                    },
                },
            );
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id);
        toast.success("Product ID copied to clipboard.");
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onConfirm}
                loading={loading}
            />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                        onClick={() => onCopy(data.id.toString())}
                    >
                        <Copy className="mr-2 h-4 w-4" /> Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() =>
                            router.push(
                                `/admin/products/${data.id}`,
                            )
                        }
                    >
                        <Edit className="mr-2 h-4 w-4" /> Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
};
