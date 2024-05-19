import { AdminSidebar } from "@/components/admin-sidebar";

import { Button } from "@/components/ui/button";
import Link from "next/link";

function AdminProducts() {
    return (
        <div className="flex h-screen">
            <AdminSidebar />
            <div className="grid h-16 w-full grid-cols-3 items-center">
                <div className="justify-self-center">
                    <Button>
                        <Link href="/admin/products/add">Add Product</Link>
                    </Button>
                </div>
                <div className="mx-auto">
                    <Button>
                        <Link href="/">Update Product</Link>
                    </Button>
                </div>
                <div className="mx-auto">
                    <Button>
                        <Link href="/">Delete Product</Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default AdminProducts;
