import {
  delay,
  http,
  HttpResponse,
} from "msw";
import type {
  ProductPayload,
} from "../types/product";
import { getMockProducts, setMockProducts } from "./mockData";

const API_URL = "/api";

export const productHandlers = [
  // Get all products
  http.get(
    `${API_URL}/products`,
    async () => {
      await delay(500);

      const products =
        getMockProducts();

      return HttpResponse.json(products);
    }
  ),

  // Get single product
  http.get(
    `${API_URL}/products/:id`,
    async ({ params }) => {
      await delay(300);

      const products =
        getMockProducts();

      const id = Number(params.id);

      const product = products.find(
        (item) => item.id === id
      );

      if (!product) {
        return HttpResponse.json(
          {
            message: "Product not found",
          },
          {
            status: 404,
          }
        );
      }

      return HttpResponse.json(product);
    }
  ),

  // Create product
  http.post(
    `${API_URL}/products`,
    async ({ request }) => {
      await delay(500);

      const products =
        getMockProducts();

      const body =
        (await request.json()) as ProductPayload;

      const newProduct = {
        id: Date.now(),
        ...body,
      };

      const updatedProducts = [
        ...products,
        newProduct,
      ];

      setMockProducts(updatedProducts);

      return HttpResponse.json(
        newProduct,
        {
          status: 201,
        }
      );
    }
  ),

  // Update product
  http.put(
    `${API_URL}/products/:id`,
    async ({ params, request }) => {
      await delay(500);

      const products =
        getMockProducts();

      const id = Number(params.id);

      const body =
        (await request.json()) as ProductPayload;

      const productExists =
        products.some(
          (product) =>
            product.id === id
        );

      if (!productExists) {
        return HttpResponse.json(
          {
            message: "Product not found",
          },
          {
            status: 404,
          }
        );
      }

      const updatedProduct = {
        id,
        ...body,
      };

      const updatedProducts =
        products.map((product) =>
          product.id === id
            ? updatedProduct
            : product
        );

      setMockProducts(
        updatedProducts
      );

      return HttpResponse.json(
        updatedProduct
      );
    }
  ),

  // Delete product
  http.delete(
    `${API_URL}/products/:id`,
    async ({ params }) => {
      await delay(500);

      const products =
        getMockProducts();

      const id = Number(params.id);

      const productExists =
        products.some(
          (product) =>
            product.id === id
        );

      if (!productExists) {
        return HttpResponse.json(
          {
            message: "Product not found",
          },
          {
            status: 404,
          }
        );
      }

      const updatedProducts =
        products.filter(
          (product) =>
            product.id !== id
        );

      setMockProducts(
        updatedProducts
      );

      return new HttpResponse(null, {
        status: 204,
      });
    }
  ),
];