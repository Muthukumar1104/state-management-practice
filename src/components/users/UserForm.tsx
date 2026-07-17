import {
  useEffect,
  useState,
} from "react";
import type {
  UserPayload,
  UserRole,
  UserStatus,
} from "../../types/user";
import { useUserStore } from "../../store/userstore";

const initialForm: UserPayload = {
  name: "",
  email: "",
  role: "Developer",
  status: "Active",
};

const UserForm = () => {
  const selectedUser = useUserStore(
    (state) => state.selectedUser
  );

  const submitting = useUserStore(
    (state) => state.submitting
  );

  const addUser = useUserStore(
    (state) => state.addUser
  );

  const editUser = useUserStore(
    (state) => state.editUser
  );

  const closeUserModal = useUserStore(
    (state) => state.closeUserModal
  );

  const [form, setForm] =
    useState<UserPayload>(initialForm);

  useEffect(() => {
    if (selectedUser) {
      setForm({
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
        status: selectedUser.status,
      });

      return;
    }

    setForm(initialForm);
  }, [selectedUser]);

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (selectedUser) {
      await editUser(form);
      return;
    }

    await addUser(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-medium"
        >
          Name
        </label>

        <input
          id="name"
          name="name"
          type="text"
          placeholder="Enter name"
          value={form.name}
          onChange={(event) =>
            setForm({
              ...form,
              name: event.target.value,
            })
          }
          required
          className="w-full rounded border p-3"
        />
      </div>

      <div>
        <label
          htmlFor="user-email"
          className="mb-1 block text-sm font-medium"
        >
          Email
        </label>

        <input
          id="user-email"
          name="email"
          type="email"
          placeholder="Enter email"
          value={form.email}
          onChange={(event) =>
            setForm({
              ...form,
              email: event.target.value,
            })
          }
          required
          className="w-full rounded border p-3"
        />
      </div>

      <div>
        <label
          htmlFor="role"
          className="mb-1 block text-sm font-medium"
        >
          Role
        </label>

        <select
          id="role"
          name="role"
          value={form.role}
          onChange={(event) =>
            setForm({
              ...form,
              role:
                event.target.value as UserRole,
            })
          }
          className="w-full rounded border p-3"
        >
          <option value="Admin">Admin</option>
          <option value="Developer">
            Developer
          </option>
          <option value="Tester">Tester</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="status"
          className="mb-1 block text-sm font-medium"
        >
          Status
        </label>

        <select
          id="status"
          name="status"
          value={form.status}
          onChange={(event) =>
            setForm({
              ...form,
              status:
                event.target.value as UserStatus,
            })
          }
          className="w-full rounded border p-3"
        >
          <option value="Active">Active</option>
          <option value="Inactive">
            Inactive
          </option>
        </select>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={closeUserModal}
          disabled={submitting}
          className="rounded bg-gray-200 px-5 py-2 disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-blue-600 px-5 py-2 text-white disabled:opacity-50"
        >
          {submitting
            ? "Saving..."
            : selectedUser
              ? "Update"
              : "Create"}
        </button>
      </div>
    </form>
  );
};

export default UserForm;