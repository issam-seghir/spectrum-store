import { verifySession } from "@/lib/dal";
import { Product } from "@/types";
import axios from "axios";

const API_URL = "https://fakestoreapi.com";

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
    try {
        const response = await axios.get<Product>(`${API_URL}/products/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch product with ID ${id}:`, error);
        return null;
    }
}
