"use client"

import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";
import { Product } from "@/types/product";
import { Minus, Plus, ShoppingCart, Trash } from "lucide-react";

export default function ProductActions({ product }: { product: Product }) {

    const incQty = useStore.use.incQty();
    const decQty = useStore.use.decQty();
    const addProduct = useStore.use.addProduct();
    const removeProduct =  useStore.use.removeProduct();
    const products = useStore((state) => state.products);
    const productQnt = products.find((p) => p.id === product.id)?.quantity;


  return (
      <div className="flex items-center justify-center gap-4 ">
          <Button
              variant="default"
              size="lg-res"
              className="px-4  min-[460px]:px-8"
              onClick={() => decQty(product.id, product)}
              disabled={!productQnt}
          >
              <Minus className="h-4 w-4" />
          </Button>
          <span>
              {productQnt ? (
                  <Button
                      variant="destructive"
                      size="lg-res"
                      className="px-4 min-[460px]:px-8"
                      onClick={() => removeProduct(product.id)}
                  >
                      <Trash className="mr-4" />
                      Remove from cart
                  </Button>
              ) : (
                  <Button
                      onClick={() => addProduct(product)}
                      variant="default"
                      size="lg-res"
                      className="sm:max-w-fit"
                  >
                      <ShoppingCart className="mr-4" />
                      Add to cart
                  </Button>
              )}
          </span>
          <Button
              variant="default"
              size="lg-res"
              className="px-4  min-[460px]:px-8"
              onClick={() => incQty(product.id, product)}
          >
              <Plus className="h-4 w-4" />
          </Button>
      </div>
  );
}
