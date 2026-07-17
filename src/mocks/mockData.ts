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
];

const getStoredUsers = (): User[] => {
  const storedUsers = localStorage.getItem(STORAGE_KEY);

  if (storedUsers) {
    return JSON.parse(storedUsers);
  }

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(initialUsers)
  );

  return initialUsers;
};

export let users: User[] = getStoredUsers();

export const setUsers = (newUsers: User[]) => {
  users = newUsers;

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(newUsers)
  );
};