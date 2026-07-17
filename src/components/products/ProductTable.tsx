import {
  Pencil,
  Trash2,
} from "lucide-react";

const products = [
  {
    id: 1,
    name: "Laptop",
    category: "Electronics",
    price: 55000,
    stock: 10,
    status: "Available",
  },
  {
    id: 2,
    name: "Office Chair",
    category: "Furniture",
    price: 8000,
    stock: 5,
    status: "Available",
  },
];

const ProductTable = () => {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="w-full">
        <thead className="bg-slate-900 text-left text-white">
          <tr>
            <th className="p-4">Product</th>
            <th className="p-4">Category</th>
            <th className="p-4">Price</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b"
            >
              <td className="p-4">
                {product.name}
              </td>

              <td className="p-4">
                {product.category}
              </td>

              <td className="p-4">
                ₹{product.price}
              </td>

              <td className="p-4">
                {product.stock}
              </td>

              <td className="p-4">
                {product.status}
              </td>

              <td className="p-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    title="Edit product"
                    aria-label="Edit product"
                    className="rounded p-2 text-blue-600 hover:bg-blue-50"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    type="button"
                    title="Delete product"
                    aria-label="Delete product"
                    className="rounded p-2 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;