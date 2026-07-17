const users = [
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
];

const UserTable = () => {
  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="w-full">
        <thead className="bg-slate-900 text-left text-white">
          <tr>
            <th className="p-4">
              Name
            </th>

            <th className="p-4">
              Email
            </th>

            <th className="p-4">
              Role
            </th>

            <th className="p-4">
              Status
            </th>

            <th className="p-4">
              Actions
            </th>
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
                    type="button"
                    className="rounded bg-yellow-500 px-3 py-1"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="rounded bg-red-500 px-3 py-1 text-white"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;