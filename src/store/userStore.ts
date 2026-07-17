import { create } from "zustand";
import { toast } from "react-toastify";

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

interface UserState {
  users: User[];
  selectedUser: User | null;

  loading: boolean;
  submitting: boolean;
  deleting: boolean;

  error: string | null;

  isUserModalOpen: boolean;
  isDeleteModalOpen: boolean;

  deleteUserId: number | null;

  fetchUsers: () => Promise<void>;

  addUser: (
    data: UserPayload
  ) => Promise<boolean>;

  editUser: (
    data: UserPayload
  ) => Promise<boolean>;

  removeUser: () => Promise<boolean>;

  openAddModal: () => void;
  openEditModal: (user: User) => void;
  closeUserModal: () => void;

  openDeleteModal: (id: number) => void;
  closeDeleteModal: () => void;

  clearError: () => void;
}

export const useUserStore = create<UserState>(
  (set, get) => ({
    users: [],
    selectedUser: null,

    loading: false,
    submitting: false,
    deleting: false,

    error: null,

    isUserModalOpen: false,
    isDeleteModalOpen: false,

    deleteUserId: null,

    fetchUsers: async () => {
      try {
        set({
          loading: true,
          error: null,
        });

        const users = await getUsers();

        set({
          users,
        });
      } catch (error) {
        set({
          error:
            error instanceof Error
              ? error.message
              : "Unable to fetch users",
        });
      } finally {
        set({
          loading: false,
        });
      }
    },

    addUser: async (data) => {
      try {
        set({
          submitting: true,
          error: null,
        });

        await createUser(data);

        await get().fetchUsers();

        set({
          isUserModalOpen: false,
        });

        toast.success("User created successfully");

        return true;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to create user";

        set({
          error: message,
        });

        toast.error(message);

        return false;
      } finally {
        set({
          submitting: false,
        });
      }
    },

    editUser: async (data) => {
      const selectedUser = get().selectedUser;

      if (!selectedUser) {
        return false;
      }

      try {
        set({
          submitting: true,
          error: null,
        });

        await updateUser(
          selectedUser.id,
          data
        );

        await get().fetchUsers();

        set({
          selectedUser: null,
          isUserModalOpen: false,
        });

        toast.success("User updated successfully");

        return true;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to update user";

        set({
          error: message,
        });

        toast.error(message);

        return false;
      } finally {
        set({
          submitting: false,
        });
      }
    },

    removeUser: async () => {
      const id = get().deleteUserId;

      if (id === null) {
        return false;
      }

      try {
        set({
          deleting: true,
          error: null,
        });

        await deleteUser(id);

        await get().fetchUsers();

        set({
          deleteUserId: null,
          isDeleteModalOpen: false,
        });

        toast.success("User deleted successfully");

        return true;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to delete user";

        set({
          error: message,
        });

        toast.error(message);

        return false;
      } finally {
        set({
          deleting: false,
        });
      }
    },

    openAddModal: () => {
      set({
        selectedUser: null,
        isUserModalOpen: true,
      });
    },

    openEditModal: (user) => {
      set({
        selectedUser: user,
        isUserModalOpen: true,
      });
    },

    closeUserModal: () => {
      set({
        selectedUser: null,
        isUserModalOpen: false,
      });
    },

    openDeleteModal: (id) => {
      set({
        deleteUserId: id,
        isDeleteModalOpen: true,
      });
    },

    closeDeleteModal: () => {
      set({
        deleteUserId: null,
        isDeleteModalOpen: false,
      });
    },

    clearError: () => {
      set({
        error: null,
      });
    },
  })
);