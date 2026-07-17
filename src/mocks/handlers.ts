import { delay, http, HttpResponse } from "msw";
import { setUsers, users } from "./mockData";
import type { LoginCredentials } from "../types/auth";
import type { UserPayload } from "../types/user";

const API_URL = "/api";

export const handlers = [
  // Login
  http.post(`${API_URL}/auth/login`, async ({ request }) => {
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
  }),

  // Get all users
  http.get(`${API_URL}/users`, async () => {
    await delay(500);

    return HttpResponse.json(users);
  }),

  // Get single user
  http.get(`${API_URL}/users/:id`, async ({ params }) => {
    await delay(300);

    const id = Number(params.id);

    const user = users.find((item) => item.id === id);

    if (!user) {
      return HttpResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    return HttpResponse.json(user);
  }),

  // Create user
  http.post(`${API_URL}/users`, async ({ request }) => {
    await delay(500);

    const body = (await request.json()) as UserPayload;

    const newUser = {
      id: Date.now(),
      ...body,
    };

    setUsers([...users, newUser]);

    return HttpResponse.json(newUser, {
      status: 201,
    });
  }),

  // Update user
  http.put(`${API_URL}/users/:id`, async ({ params, request }) => {
    await delay(500);

    const id = Number(params.id);
    const body = (await request.json()) as UserPayload;

    const existingUser = users.find(
      (user) => user.id === id
    );

    if (!existingUser) {
      return HttpResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const updatedUser = {
      ...existingUser,
      ...body,
    };

    setUsers(
      users.map((user) =>
        user.id === id ? updatedUser : user
      )
    );

    return HttpResponse.json(updatedUser);
  }),

  // Delete user
  http.delete(`${API_URL}/users/:id`, async ({ params }) => {
    await delay(500);

    const id = Number(params.id);

    const existingUser = users.find(
      (user) => user.id === id
    );

    if (!existingUser) {
      return HttpResponse.json(
        {
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    setUsers(
      users.filter((user) => user.id !== id)
    );

    return new HttpResponse(null, {
      status: 204,
    });
  }),
];