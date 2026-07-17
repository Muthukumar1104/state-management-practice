import { PackagePlus } from "lucide-react";

import ProductTable from "../components/products/ProductTable";
import ProductModal from "../components/products/ProductModal";
import DeleteProductModal from "../components/products/DeleteProductModal";

const ProductsPage = () => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Product Management
          </h1>

          <p className="mt-1 text-gray-500">
            Practice product CRUD operations.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded bg-blue-600 px-5 py-2 text-white"
        >
          <PackagePlus size={18} />
          Add Product
        </button>
      </div>

      <ProductTable />

      <ProductModal />

      <DeleteProductModal />
    </div>
  );
};

export default ProductsPage;