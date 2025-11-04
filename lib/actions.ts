"use server";
import { verifySession } from "@/lib/dal";
import { ProductCategory } from "@/types/product";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import apiClient from "./apiClient";
const API_URL = process.env.API_URL;

const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
});

/**
 ** Login in user  Action
 * @param {string} username - the username of user
 * @param {string} password - the password of user
 */
export async function login(formData: FormData) {
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 1000; // 1 second

    const validatedFields = loginSchema.safeParse({
        username: formData.get("username"),
        password: formData.get("password"),
    });
    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        };
    }

    let lastError: any;
    let loginSuccessful = false;

    // Retry logic with exponential backoff for external API call
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            const response = await apiClient.post(
                `${API_URL}/auth/login`,
                validatedFields.data,
                {
                    timeout: 15000, // 15 second timeout per attempt
                },
            );

            // Success! Set cookie
            const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
            cookies().set("token", response.data.token, {
                httpOnly: true,
                secure: true,
                expires: expiresAt,
                sameSite: "lax",
                path: "/",
            });

            loginSuccessful = true;
            break; // Exit retry loop on success
        } catch (error: any) {
            lastError = error;

            // If it's an HTML response (Cloudflare), log and retry
            if (error?.isExternalHtml) {
                console.warn(
                    `Login attempt ${attempt}/${MAX_RETRIES} failed: external API returned HTML (Cloudflare challenge)`,
                    { status: error?.response?.status, attempt },
                );
            } else {
                // Other errors (401, 404, network, etc.)
                console.error(
                    `Login attempt ${attempt}/${MAX_RETRIES} failed:`,
                    error?.response?.data || error?.message,
                );
            }

            // If not the last attempt, wait before retrying
            if (attempt < MAX_RETRIES) {
                const delay = RETRY_DELAY * Math.pow(2, attempt - 1); // Exponential backoff
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }

    // If login succeeded, redirect (outside try-catch to avoid catching redirect's internal error)
    if (loginSuccessful) {
        redirect("/");
    }

    // All retries failed - return user-friendly error
    const errorMessage = lastError?.isExternalHtml
        ? "Authentication service is temporarily unavailable. Please try again in a few moments."
        : lastError?.response?.data?.message ||
          lastError?.message ||
          "Authentication failed. Please check your credentials.";

    console.error("All login attempts failed:", errorMessage);
    return {
        errors: {
            username: errorMessage,
            password: errorMessage,
        },
        message: errorMessage,
    };
}

/**
 ** Logs out the user by deleting the token cookie and redirecting to the login page.
 * @returns {Promise<void>}
 */
export async function logout(): Promise<void> {
    cookies().delete("token");
    redirect("/login");
}

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

/**
 ** Creates a new product.
 *
 * @param {FormData} formData - The form data of the new product.
 * @returns {Promise<Product>} A promise that resolves to the created product.
 */
export async function createProduct(formData: FormData) {
    const session = await verifySession();
    if (!session) return [];
    // Redirect to home page if the user is not the Admin
    if (!session.isAdmin) {
        redirect("/");
    }

    try {
        const validatedFields = formSchema.safeParse({
            title: formData.get("title"),
            price: formData.get("price"),
            description: formData.get("description"),
            category: formData.get("category"),
            image: formData.get("image"),
        });

        // Return early if the form data is invalid
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }
        const res = await apiClient.post(
            `${API_URL}/products`,
            validatedFields.data,
        );

        revalidatePath("/admin/products");
        revalidatePath("/products");
        return { message: "Create Product successfully", data: res.data };
    } catch (error: any) {
        console.error(`Failed to create product:`, error?.response?.data);
        return {
            errors: {
                title: "There was an error with this title",
                description: "There was an error with this description",
                price: "There was an error with this price",
                category: "There was an error with this category",
                image: "There was an error with this image",
            },
            message: error?.response?.data,
        };
    }
}

/**
 * Updates an existing product.
 *
 * @param {string} id - The ID of the product to update.
 * @param {FormData} formData - The updated form data of the product.
 * @returns {Promise<Product> } A promise that resolves to the updated product.
 */
export async function updateProduct(id: string, formData: FormData) {
    // For enhanced security, the verifySession function can be used to authenticate the user.
    // While middleware is a viable option, verifySession can also be directly utilized within services.
    // We can use it also for checking the user role and other user data.
    // This forms part of the Data Access Layer (DAL).
    const session = await verifySession();
    if (!session) return [];
    // Redirect to home page if the user is not the Admin
    if (!session.isAdmin) {
        redirect("/");
    }

    try {
        const validatedFields = formSchema.safeParse({
            title: formData.get("title"),
            price: formData.get("price"),
            description: formData.get("description"),
            category: formData.get("category"),
            image: formData.get("image"),
        });

        // Return early if the form data is invalid
        if (!validatedFields.success) {
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }
        const res = await apiClient.put(
            `${API_URL}/products/${id}`,
            validatedFields.data,
        );

        revalidatePath("/admin/products");
        revalidatePath("/products");
        return { message: "Update Product successfully", data: res.data };
    } catch (error: any) {
        console.error(`Failed to update product:`, error?.response?.data);
        return {
            errors: {
                title: "There was an error with this title",
                description: "There was an error with this description",
                price: "There was an error with this price",
                category: "There was an error with this category",
                image: "There was an error with this image",
            },
            message: error?.response?.data,
        };
    }
}

/**
 * Deletes a product.
 *
 * @param {string} id - The ID of the product to delete.
 * @returns {Promise<void>} A promise that resolves when the product is deleted.
 */
export async function deleteProduct(id: string) {
    // For enhanced security, the verifySession function can be used to authenticate the user.
    // While middleware is a viable option, verifySession can also be directly utilized within services.
    // We can use it also for checking the user role and other user data.
    // This forms part of the Data Access Layer (DAL).
    const session = await verifySession();
    if (!session) return [];
    // Redirect to home page if the user is not the Admin
    if (!session.isAdmin) {
        redirect("/");
    }

    try {
        const res = await apiClient.delete(`${API_URL}/products/${id}`);
        return res.data;
    } catch (error: any) {
        console.error(`Failed to delete product:`, error?.response?.data);
        return {
            message: error?.response?.data,
        };
    }
}
