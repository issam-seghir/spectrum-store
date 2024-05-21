export type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: Rating;
};

export enum ProductCategory {
    Electronics = "electronics",
    Jewelery = "jewelery",
    MenClothing = "men's clothing",
    WomenClothing = "women's clothing",
}

export interface Rating {
    rate: number;
    count: number;
}

export type CartItem = {
    product: Product;
    quantity: number;
};

export interface ProductPageQueryParams {
    searchParams: {
        category?: string;
        query?: string;
    };
}

export interface LoginFrom {
    username: string;
    password: string;
}
