import { verifySession } from "@/lib/dal";
import { Product } from "@/lib/types";
import axios from "axios";
const API_URL = process.env.API_URL;

/**
 *  Getting all products from fake store API
 *
 * @export
 * @param {string} [category]
 * @return {Promise<Product[]>}
 */
export async function getProducts(
    category?: string,
    query?: string,
): Promise<Product[]> {
    // For enhanced security, the verifySession function can be used to authenticate the user.
    // While middleware is a viable option, verifySession can also be directly utilized within services.
    // We can use it also for checking the user role and other user data.
    // This forms part of the Data Access Layer (DAL).
    const session = await verifySession();
    if (!session) return [];

    try {
        const url = new URL(`${API_URL}/products`);
        if (category) {
            url.pathname += `/category/${category}`;
        }

        const { data } = await axios.get<Product[]>(url.toString());

        if (query) {
            return data.filter((product) =>
                product.title.toLowerCase().includes(query?.toLowerCase()),
            );
        }

        return data;
    } catch (error) {
        console.error(`Failed to fetch products:`, error);
        return [];
    }
}

/**
 * Getting all categories from fake store API
 * @returns {Promise<string[]>} A promise that resolves to an array of product categories.
 * @throws {AxiosError} When the API request fails.
 */
export async function getCategories(): Promise<string[]> {
    // For enhanced security, the verifySession function can be used to authenticate the user.
    // While middleware is a viable option, verifySession can also be directly utilized within services.
    // We can use it also for checking the user role and other user data.
    // This forms part of the Data Access Layer (DAL).
    const session = await verifySession();
    if (!session) return [];

    try {
        const { data } = await axios.get<string[]>(
            `${API_URL}/products/categories`,
        );
        return data;
    } catch (error) {
        console.error(`Failed to fetch products:`, error);
        return [];
    }
}

/**
 * Getting a specific product by its ID
 * @param {number | string} id - The ID of the product to fetch.
 * @returns {Promise<Product> | null} A promise that resolves to the fetched product.
 */
export async function getProductById(
    id: number | string,
): Promise<Product | null> {
    // For enhanced security, the verifySession function can be used to authenticate the user.
    // While middleware is a viable option, verifySession can also be directly utilized within services.
    // We can use it also for checking the user role and other user data.
    // This forms part of the Data Access Layer (DAL).
    const session = await verifySession();
    if (!session) return null;

    try {
        const response = await axios.get<Product>(`${API_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch product with ID ${id}:`, error);
        return null;
    }
}
