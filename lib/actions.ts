"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const API_URL = "https://fakestoreapi.com";

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


export async function logout() {
    cookies().delete("token");
    redirect("/login");
}
