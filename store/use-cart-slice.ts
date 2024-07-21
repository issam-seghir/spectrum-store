import { CartSlice, SliceCreator } from "@/types/store";

export const createCartSlice: SliceCreator<CartSlice> = (set, get) => ({
    products: [],
    total: 0,
    incQty: (productId) =>
        set((state) => {
            const foundProduct = state.products.find(
                (product) => product.id === productId,
            );
            if (foundProduct) {
                foundProduct.quantity += 1;
            }
        }),
    decQty: (productId) =>
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
