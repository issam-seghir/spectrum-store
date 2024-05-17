
export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
    quantity?: number;
};

export interface Rating {
    rate: number;
    count: number;
}

export type CartItem = {
    product: Product;
    quantity: number;
};

export interface Category {
    link: string;
    text: string;
    id: string;
}

export interface ProductPageQueryParams {
    searchParams: {
        category?: string;
        limit?: number;
        sort?: "asc" | "desc";
        query?: string;
    };
}
