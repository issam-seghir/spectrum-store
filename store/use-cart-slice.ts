import { CartSlice, SliceCreator } from "@/types/store";

export const createCartSlice: SliceCreator<CartSlice> = (set, get) => ({
    products: [],
    total: 0,
    incQty: (productId, product) =>
        set((state) => {
            const foundIndex = state.products.findIndex(
                (p) => p.id === productId,
            );
            if (foundIndex !== -1) {
                // Product exists, increment quantity
                state.products[foundIndex].quantity += 1;
            } else if (product) {
                // Product doesn't exist, add new product
                const newProduct = { ...product, quantity: 1 }; 
                state.products.push(newProduct);
            }
        }),
    decQty: (productId, product) =>
        set((state) => {
            const foundIndex = state.products.findIndex(
                (product) => product.id === productId,
            );

            if (foundIndex !== -1) {
                if (state.products[foundIndex].quantity === 1) {
                    state.products.splice(foundIndex, 1);
                } else {
                    state.products[foundIndex].quantity -= 1;
                }
            } else {
                product && state.addProduct(product);
            }
        }),
    addProduct: (product) =>
        set((state) => {
            state.products.push({ ...product, quantity: 1 });
        }),
    removeProduct: (productId) =>
        set((state) => {
            state.products = state.products.filter(
                (product) => product.id !== productId,
            );
        }),
    getProductById: (productId) =>
        get().products.find((product) => product.id === productId),
    setTotal: (total) =>
        set((state) => {
            state.total = total;
        }),

    reset: () => set(() => ({ products: [], total: 0 })),
});
