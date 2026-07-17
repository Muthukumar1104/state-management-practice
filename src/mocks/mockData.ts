import type { Product } from "../types/product";
import type { User } from "../types/user";

const USER_STORAGE_KEY = "mock_users";
const PRODUCT_STORAGE_KEY = "mock_products";

const initialUsers: User[] = [
  {
    id: 1,
    name: "Arun Kumar",
    email: "arun@example.com",
    role: "Developer",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya@example.com",
    role: "Tester",
    status: "Active",
  },
];

const initialProducts: Product[] = [
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

export const getMockUsers = (): User[] => {
  const storedUsers =
    localStorage.getItem(USER_STORAGE_KEY);

  if (storedUsers) {
    return JSON.parse(storedUsers) as User[];
  }

  localStorage.setItem(
    USER_STORAGE_KEY,
    JSON.stringify(initialUsers)
  );

  return initialUsers;
};

export const setMockUsers = (
  users: User[]
): void => {
  localStorage.setItem(
    USER_STORAGE_KEY,
    JSON.stringify(users)
  );
};

export const getMockProducts = (): Product[] => {
  const storedProducts =
    localStorage.getItem(PRODUCT_STORAGE_KEY);

  if (storedProducts) {
    return JSON.parse(
      storedProducts
    ) as Product[];
  }

  localStorage.setItem(
    PRODUCT_STORAGE_KEY,
    JSON.stringify(initialProducts)
  );

  return initialProducts;
};

export const setMockProducts = (
  products: Product[]
): void => {
  localStorage.setItem(
    PRODUCT_STORAGE_KEY,
    JSON.stringify(products)
  );
};