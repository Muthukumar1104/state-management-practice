import {
  type FormEvent,
  useEffect,
  useState,
} from "react";

import type {
  User,
  UserPayload,
  UserRole,
  UserStatus,
} from "../../types/user";

interface UserFormProps {
  selectedUser: User | null;
  onSubmit: (data: UserPayload) => Promise<void>;
  onCancel: () => void;
}

const initialForm: UserPayload = {
  name: "",
  email: "",
  role: "Developer",
  status: "Active",
};

const UserForm = ({
  selectedUser,
  onSubmit,
  onCancel,
}: UserFormProps) => {
  const [form, setForm] =
    useState<UserPayload>(initialForm);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setForm({
        name: selectedUser.name,
        email: selectedUser.email,
        role: selectedUser.role,
        status: selectedUser.status,
      });
    } else {
      setForm(initialForm);
    }
  }, [selectedUser]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setLoading(true);

      await onSubmit(form);

      setForm(initialForm);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg bg-white p-6 shadow"
    >
      <h2 className="mb-5 text-xl font-semibold">
        {selectedUser
          ? "Edit User"
          : "Add User"}
      </h2>

      <div className="space-y-4">
        <input
          placeholder="Name"
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

        <input
          type="email"
          placeholder="Email"
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

        <select
          value={form.role}
          onChange={(event) =>
            setForm({
              ...form,
              role: event.target.value as UserRole,
            })
          }
          className="w-full rounded border p-3"
        >
          <option>Admin</option>
          <option>Developer</option>
          <option>Tester</option>
        </select>

        <select
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
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <div className="flex gap-3">
          <button
            disabled={loading}
            className="rounded bg-blue-600 px-5 py-2 text-white"
          >
            {loading
              ? "Saving..."
              : selectedUser
                ? "Update"
                : "Create"}
          </button>

          {selectedUser && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded bg-gray-200 px-5 py-2"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default UserForm;