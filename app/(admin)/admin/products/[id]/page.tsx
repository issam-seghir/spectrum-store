
import { ProductForm } from "@/components/admin/product-form";
import { Product } from "@/types/product";
import { getProduct } from "@/lib/services";


const ProductPage = async (
    props: {
        params: Promise<{ id: string }>;
    }
) => {
    const params = await props.params;

    const product : Product| null = await getProduct(params.id);
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
