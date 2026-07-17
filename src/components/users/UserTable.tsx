import type { User } from "../../types/user";

interface UserTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
}

const UserTable = ({
  users,
  onEdit,
  onDelete,
}: UserTableProps) => {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow">
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
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(user)}
                    className="rounded bg-yellow-500 px-3 py-1"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      onDelete(user.id)
                    }
                    className="rounded bg-red-500 px-3 py-1 text-white"
                  >
                    Delete
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