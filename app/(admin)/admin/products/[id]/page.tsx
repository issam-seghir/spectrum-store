
import { ProductForm } from "@/components/admin/product-form";
import { Product } from "@/lib/types";


const ProductPage = async ({
    params,
}: {
    params: { id: string };
}) => {


    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ProductForm
                    product={product}
                />
            </div>
        </div>
    );
};

export default ProductPage;
