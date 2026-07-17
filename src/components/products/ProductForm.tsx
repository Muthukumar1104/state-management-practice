const ProductForm = () => {
  return (
    <form className="space-y-4">
      <div>
        <label
          htmlFor="product-name"
          className="mb-1 block text-sm font-medium"
        >
          Product Name
        </label>

        <input
          id="product-name"
          name="name"
          type="text"
          placeholder="Enter product name"
          className="w-full rounded border p-3"
        />
      </div>

      <div>
        <label
          htmlFor="category"
          className="mb-1 block text-sm font-medium"
        >
          Category
        </label>

        <select
          id="category"
          name="category"
          className="w-full rounded border p-3"
        >
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Furniture">Furniture</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="price"
          className="mb-1 block text-sm font-medium"
        >
          Price
        </label>

        <input
          id="price"
          name="price"
          type="number"
          placeholder="Enter price"
          className="w-full rounded border p-3"
        />
      </div>

      <div>
        <label
          htmlFor="stock"
          className="mb-1 block text-sm font-medium"
        >
          Stock
        </label>

        <input
          id="stock"
          name="stock"
          type="number"
          placeholder="Enter stock"
          className="w-full rounded border p-3"
        />
      </div>

      <div>
        <label
          htmlFor="status"
          className="mb-1 block text-sm font-medium"
        >
          Status
        </label>

        <select
          id="status"
          name="status"
          className="w-full rounded border p-3"
        >
          <option value="Available">Available</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="rounded bg-gray-200 px-5 py-2"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded bg-blue-600 px-5 py-2 text-white"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default ProductForm;