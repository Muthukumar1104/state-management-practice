import {
  delay,
  http,
  HttpResponse,
} from "msw";
import type { LoginCredentials } from "../types/auth";

const API_URL = "/api";

export const authHandlers = [
  http.post(
    `${API_URL}/auth/login`,
    async ({ request }) => {
      await delay(500);

      const credentials =
        (await request.json()) as LoginCredentials;

      if (
        credentials.email !== "admin@example.com" ||
        credentials.password !== "admin123"
      ) {
        return HttpResponse.json(
          {
            message: "Invalid email or password",
          },
          {
            status: 401,
          }
        );
      }

      return HttpResponse.json({
        user: {
          id: 1,
          name: "Admin User",
          email: "admin@example.com",
        },
        token: "mock-access-token",
      });
    }
  ),
];