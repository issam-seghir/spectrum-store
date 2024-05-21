"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { verifySession } from "@/lib/dal";

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
export async function login( formData: FormData) {
    try {
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
        const res = await axios.post(
            `${API_URL}/auth/login`,
            validatedFields.data,
        );
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        // Set cookie
        cookies().set("token", res?.data?.token, {
            httpOnly: true,
            secure: true,
            expires: expiresAt,
            sameSite: "lax",
            path: "/",
        });
    } catch (error) {
        console.error(`Failed to login user:`, error?.response?.data);
        return {
            errors: {
                username: "There was an error with this username",
                password: "There was an error with this password",
            },
            message: error?.response?.data,
        };
    }
    redirect("/");
}

/**
 ** Logs out the user by deleting the token cookie and redirecting to the login page.
 * @returns {Promise<void>}
 */
export async function logout(): Promise<void> {
    cookies().delete("token");
    redirect("/login");
}


/**
 ** Creates a new product.
 *
 * @param {FormData} formData - The form data of the new product.
 * @returns {Promise<Product>} A promise that resolves to the created product.
 */
export async function createProduct(formData: FormData) {
    // For enhanced security, the verifySession function can be used to authenticate the user.
    // While middleware is a viable option, verifySession can also be directly utilized within services.
    // We can use it also for checking the user role and other user data.
    // This forms part of the Data Access Layer (DAL).
    const session = await verifySession();
    if (!session) return [];
    // Redirect to home page if the user is not the Admin
    if (!session.isAdmin) {
        redirect("/");
    };

    try {
        const res = await axios.post(`${API_URL}/products`, formData);
        return res.data;
    } catch (error) {
        console.error(`Failed to create product:`, error?.response?.data);
        return {
            errors: {
                title: "There was an error with this title",
                description: "There was an error with this description",
                price: "There was an error with this price",
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
 * @returns {Promise<Product>} A promise that resolves to the updated product.
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
        const res = await axios.put(`${API_URL}/products/${id}`, formData);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(`Failed to update product:`, error?.response?.data);
        return {
            errors: {
                title: "There was an error with this title",
                description: "There was an error with this description",
                price: "There was an error with this price",
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
        const res = await axios.delete(`${API_URL}/products/${id}`);
        console.log(res.data);
        return res.data;
    } catch (error) {
        console.error(`Failed to delete product:`, error?.response?.data);
        return {
            message: error?.response?.data,
        };
    }
}
