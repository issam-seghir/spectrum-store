"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import * as z from "zod";

import { AlertModal } from "@/components/ui/alert-modal";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createProduct, deleteProduct, updateProduct } from "@/lib/actions";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Product, ProductCategory } from "@/lib/types";
import Image from "next/image";
import { useFormStatus } from "react-dom";

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
    category: z.nativeEnum(ProductCategory),
    image: z.string().url(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
    product?: Product | null;
}

const categories = Object.values(ProductCategory);

export const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
    const router = useRouter();
    const { pending } = useFormStatus();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = product ? "Edit product" : "Create product";
    const description = product ? "Edit a product." : "Add a new product";
    const action = product ? "Save changes" : "Create";

    const defaultValues = product
        ? {
              ...product,
              price: parseFloat(String(product?.price)),
              category: product.category as ProductCategory,
          }
        : {
              title: "",
              price: 0,
              description: "",
              category: ProductCategory.Electronics,
              image: "",
          };

    const form = useForm<ProductFormValues>({
        mode: "onChange",
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    const clientAction = async (formData: FormData) => {
        try {
            // trigger client side validation
            form.trigger();
            if (!form.formState.isValid) {
                return;
            }

            setLoading(true);
            if (product) {
                const res = await updateProduct(
                    product.id.toString(),
                    formData,
                );
                if ("data" in res) {
                    const { data } = res;
                    toast.custom(
                        (t) => (
                            <div
                                className={`${
                                    t.visible
                                        ? "animate-enter"
                                        : "animate-leave"
                                } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
                            >
                                <div className="w-full flex-1 p-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 pt-0.5">
                                            <Image
                                                className="h-20 w-20 rounded-md"
                                                width={80}
                                                height={80}
                                                src={data.image}
                                                alt={data.title}
                                            />
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                Product {data.id} -
                                                {data.title.slice(0, 10)}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Category:
                                                {data.category}
                                            </p>
                                            <div className="font-bold text-green-500">
                                                Updated 🚀
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ),
                        {
                            style: {
                                minWidth: "250px",
                            },
                            duration: 3000,
                        },
                    );
                }
            } else {
                form.trigger();
                if (!form.formState.isValid) {
                    return;
                }
                setLoading(true);
                const res = await createProduct(formData);
                if ("data" in res) {
                    const { data } = res;
                    toast.custom(
                        (t) => (
                            <div
                                className={`${
                                    t.visible
                                        ? "animate-enter"
                                        : "animate-leave"
                                } pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
                            >
                                <div className="w-full flex-1 p-4">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 pt-0.5">
                                            <Image
                                                className="h-20 w-20 rounded-md"
                                                width={80}
                                                height={80}
                                                loader={({ src }) => src}
                                                src={data.image}
                                                alt={data.title}
                                                // fallback Image
                                                onError={(event) => {
                                                    const target =
                                                        event.target as HTMLImageElement;
                                                    target.id =
                                                        "https://i.imgur.com/zAC10no.png";
                                                    target.srcset =
                                                        "https://i.imgur.com/zAC10no.png";
                                                }}
                                            />
                                        </div>
                                        <div className="ml-3 flex-1">
                                            <p className="text-sm font-medium text-gray-900">
                                                Product {data.id} -
                                                {data.title.slice(0, 10)}
                                            </p>
                                            <p className="mt-1 text-sm text-gray-500">
                                                Category:
                                                {data.category}
                                            </p>
                                            <div className="font-bold text-green-500">
                                                Created 🚀
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ),
                        {
                            style: {
                                minWidth: "250px",
                            },
                            duration: 3000,
                        },
                    );
                }
                router.refresh();
                router.push("../products");
            }
        } catch (error: any) {
            toast.error("Something went wrong.", error.message);
        } finally {
            setLoading(false);
        }
    };
    const onDelete = async () => {
        if (!product) {
            toast.error("Product not found.");
            return;
        }
        try {
            setLoading(true);
            toast.promise(
                deleteProduct(product.id.toString()),
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
            router.refresh();
            router.push("../products");
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
                loading={
                    loading ||
                    form.formState.isLoading ||
                    form.formState.isSubmitting
                }
            />
            <div className="flex items-center justify-between">
                <Heading title={title} description={description} />
                {product && (
                    <Button
                        disabled={
                            loading ||
                            form.formState.isLoading ||
                            form.formState.isSubmitting
                        }
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
                <form action={clientAction} className="w-full space-y-8">
                    <div className="gap-8 md:grid md:grid-cols-3">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={
                                                loading ||
                                                form.formState.isLoading ||
                                                form.formState.isSubmitting
                                            }
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
                                            disabled={
                                                loading ||
                                                form.formState.isLoading ||
                                                form.formState.isSubmitting
                                            }
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
                                            disabled={
                                                loading ||
                                                form.formState.isLoading ||
                                                form.formState.isSubmitting
                                            }
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
                                            disabled={
                                                loading ||
                                                form.formState.isLoading ||
                                                form.formState.isSubmitting
                                            }
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
                                        disabled={
                                            loading ||
                                            form.formState.isLoading ||
                                            form.formState.isSubmitting
                                        }
                                        defaultValue={field.value}
                                        onValueChange={field.onChange}
                                        {...field}
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
                                            {categories.map((category) => (
                                                <SelectItem
                                                    key={uuidv4()}
                                                    value={category}
                                                >
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={
                            pending ||
                            loading ||
                            form.formState.isLoading ||
                            form.formState.isSubmitting
                        }
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
