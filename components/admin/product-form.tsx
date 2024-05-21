"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";

import { AlertModal } from "@/components/ui/alert-modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ProductCategory } from "@/lib/types";
import { Product } from "../../lib/types";
const formSchema = z.object({
    title: z.string().min(1),
    price: z.coerce.number().min(1),
    description: z
        .string()
        .min(10, {
            message: "description must be at least 10 characters.",
        })
        .max(160, {
            message: "description must not be longer than 30 characters.",
        }),
    category: z.enum(Object.values(ProductCategory).map(String) as any),
    image: z.string().url(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
    product?: Product | null
}

const categories = Object.values(ProductCategory);

export const ProductForm: React.FC<ProductFormProps> = ({
    product,
}) => {

    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = product ? "Edit product" : "Create product";
    const description = product ? "Edit a product." : "Add a new product";
    const toastMessage = product ? "Product updated." : "Product created.";
    const action = product ? "Save changes" : "Create";

    const defaultValues = product
        ? {
              ...product,
              price: parseFloat(String(product?.price)),
          }
        : {
              title: "",
              price: 0,
              description: "",
              category: "",
              image: "",
          };

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const onSubmit = async (data: ProductFormValues) => {
        try {
            setLoading(true);
            if (product) {
                await axios.patch(
                    `/api/${params.storeId}/products/${params.productId}`,
                    data,
                );
            } else {
                await axios.post(`/api/${params.storeId}/products`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/products`);
            toast.success(toastMessage);
        } catch (error: any) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(
                `/api/${params.storeId}/products/${params.productId}`,
            );
            router.refresh();
            router.push(`/${params.storeId}/products`);
            toast.success("Product deleted.");
        } catch (error: any) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {product && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full space-y-8"
                >
                    <div className="gap-8 md:grid md:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="Product name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            disabled={loading}
                                            placeholder="Product description"
                                            className="resize-none"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="price"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Price</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            disabled={loading}
                                            placeholder="9.99$"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Image URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="url"
                                            disabled={loading}
                                            placeholder="https://example.com/image.jpg"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <Select
                                        disabled={loading}
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    defaultValue={field.value}
                                                    placeholder="Select a category"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map(
                                                (category, index) => (
                                                    <SelectItem
                                                        key={index}
                                                        value={category}
                                                    >
                                                        {category}
                                                    </SelectItem>
                                                ),
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={loading}
                        className="ml-auto"
                        type="submit"
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};
