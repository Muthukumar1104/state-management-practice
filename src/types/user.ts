export type UserRole = "Admin" | "Developer" | "Tester";

export type UserStatus = "Active" | "Inactive";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}

export type UserPayload = Omit<User, "id">;