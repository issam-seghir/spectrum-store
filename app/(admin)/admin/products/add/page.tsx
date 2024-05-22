import { ProductForm } from "@/components/admin/product-form";
import { Product } from "@/lib/types";
import { getProductById } from "@/lib/services";

const ProductPage = async () => {

    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm />
            </div>
        </div>
    );
};

export default ProductPage;
