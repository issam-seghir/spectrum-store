import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddProduct() {
  return (
    <div className="max-w-7xl mx-[5%] px-4 lg:px-8 py-6 mt-[5%] dark:bg-gray-800">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
        Create New Product
      </h1>
      <form className="mt-5 space-y-6">
        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <Label
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="product_name"
            >
              Product Name
            </Label>
            <Input
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              id="product_name"
              type="text"
            />
          </div>
          <div className="sm:col-span-6">
            <Label
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="description"
            >
              Description
            </Label>
            <textarea
              className="mt-1 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              id="description"
              rows={3}
            />
          </div>
          <div className="sm:col-span-3">
            <Label
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="price"
            >
              Price
            </Label>
            <Input
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              id="price"
              step="0.01"
              type="number"
            />
          </div>
          <div className="sm:col-span-3">
            <Label
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="stock"
            >
              Stock
            </Label>
            <Input
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              id="stock"
              type="number"
            />
          </div>
          <div className="sm:col-span-6">
            <Label
              className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              htmlFor="product_image"
            >
              Product Image
            </Label>
            <Input
              className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 dark:bg-gray-700 dark:border-gray-600"
              id="product_image"
              type="file"
            />
          </div>
        </div>
        <Button type="submit">Create Product</Button>
      </form>
    </div>
  );
}
