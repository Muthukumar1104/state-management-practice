import type { User } from "../types/user";

const STORAGE_KEY = "mock_users";

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
  {
    id: 3,
    name: "Rahul Verma",
    email: "rahul@example.com",
    role: "Admin",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha@example.com",
    role: "Developer",
    status: "Active",
  },
  {
    id: 5,
    name: "Karthik Raj",
    email: "karthik@example.com",
    role: "Tester",
    status: "Inactive",
  },
];

export const getMockUsers = (): User[] => {
  const storedUsers = localStorage.getItem(STORAGE_KEY);

  if (storedUsers) {
    return JSON.parse(storedUsers) as User[];
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(initialUsers)
  );

  return initialUsers;
};

export const setMockUsers = (users: User[]): void => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(users)
  );
};