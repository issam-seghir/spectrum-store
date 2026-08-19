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



export interface ProductSearchParams {
    category?: string;
    query?: string;
}

//? Next.js 15+ passes `searchParams` to pages as a Promise, so page components
//? must await it before handing the resolved value to their children.
export interface ProductPageProps {
    searchParams: Promise<ProductSearchParams>;
}

//? Props for the components that receive the already-resolved search params.
export interface ProductPageQueryParams {
    searchParams: ProductSearchParams;
}


export interface Rating {
    rate: number;
    count: number;
}
