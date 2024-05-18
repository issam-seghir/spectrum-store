import { Product, ProductPageQueryParams } from "@/types";
import axios from "axios";

const API_URL = "https://fakestoreapi.com";

/**
 *  Getting all products from fake store API
 *
 * @export
 * @param {string} [category]
 * @return {Promise<Product[]>}
 */
export async function getProducts(category?: string,query?:string): Promise<Product[]> {
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

// Getting all categories from fake store API
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



// Getting all produts in a specfic category from fake store API
export const getCategoyProducts = async (categoryName: string) => {
    const { data } = await axios.get(
        `${API_URL}/products/category/${categoryName}`,
    );
    return data;
};

// Getting specific product by id
export const getProduct = async (id: number | string) => {
    const { data } = await axios.get(`${API_URL}/products/${id}`);
    return data;
};
