import {
  useEffect,
  useState,
} from "react";

import UserForm from "../components/users/UserForm";
import UserTable from "../components/users/UserTable";

import {
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "../services/userService";

import type {
  User,
  UserPayload,
} from "../types/user";

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getUsers();

      setUsers(data);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (
    data: UserPayload
  ) => {
    try {
      if (selectedUser) {
        await updateUser(
          selectedUser.id,
          data
        );

        setSelectedUser(null);
      } else {
        await createUser(data);
      }

      await fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (
    id: number
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteUser(id);

      if (selectedUser?.id === id) {
        setSelectedUser(null);
      }

      await fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          User Management
        </h1>

        <p className="mt-1 text-gray-500">
          Practice CRUD operations using different
          state management libraries.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
        <UserForm
          selectedUser={selectedUser}
          onSubmit={handleSubmit}
          onCancel={() =>
            setSelectedUser(null)
          }
        />

        <div>
          {loading && (
            <p>Loading users...</p>
          )}

          {error && (
            <p className="text-red-500">
              {error}
            </p>
          )}

          {!loading && !error && (
            <UserTable
              users={users}
              onEdit={setSelectedUser}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersPage;