import { Product } from "@/types/product";
import { CartProduct } from "@/types/cart-product";
import { StateCreator } from "zustand";

export interface CartSlice {
    products: CartProduct[];
    total: number;
    addProduct: (product: Product) => void;
    removeProduct: (productId: number) => void;
    incQty: (productId: number, product?: Product) => void;
    decQty: (productId: number, product?: Product) => void;
    getProductById: (productId: number) => CartProduct | undefined;
    setTotal: (total: number) => void;
    reset: () => void;
}

export type SliceCreator<S> = StateCreator<
    S,
    [["zustand/immer", never], ["zustand/devtools", never]],
    [],
    S
>;
export type Store = CartSlice;
