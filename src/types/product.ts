export type ProductCategory =
  | "Electronics"
  | "Clothing"
  | "Furniture";

export type ProductStatus =
  | "Available"
  | "Out of Stock";

export interface Product {
  id: number;
  name: string;
  category: ProductCategory;
  price: number;
  stock: number;
  status: ProductStatus;
}

export type ProductPayload =
  Omit<Product, "id">;