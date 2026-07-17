import {
  Pencil,
  Trash2,
} from "lucide-react";
import { useUserStore } from "../../store/userstore";

const UserTable = () => {
  const users = useUserStore(
    (state) => state.users
  );

  const openEditModal = useUserStore(
    (state) => state.openEditModal
  );

  const openDeleteModal = useUserStore(
    (state) => state.openDeleteModal
  );

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="w-full">
        <thead className="bg-slate-900 text-left text-white">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Status</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b"
            >
              <td className="p-4">
                {user.name}
              </td>

              <td className="p-4">
                {user.email}
              </td>

              <td className="p-4">
                {user.role}
              </td>

              <td className="p-4">
                {user.status}
              </td>

              <td className="p-4">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    title="Edit user"
                    aria-label="Edit user"
                    onClick={() =>
                      openEditModal(user)
                    }
                    className="rounded p-2 text-blue-600 transition hover:bg-blue-50"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    type="button"
                    title="Delete user"
                    aria-label="Delete user"
                    onClick={() =>
                      openDeleteModal(user.id)
                    }
                    className="rounded p-2 text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {users.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="p-8 text-center text-gray-500"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;