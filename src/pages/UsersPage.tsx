import { useEffect } from "react";
import { UserPlus } from "lucide-react";
import UserTable from "../components/users/UserTable";
import UserModal from "../components/users/UserModal";
import DeleteConfirmModal from "../components/users/DeleteConfirmModal";
import { useUserStore } from "../store/userstore";

const UsersPage = () => {
  const loading = useUserStore(
    (state) => state.loading
  );

  const error = useUserStore(
    (state) => state.error
  );

  const fetchUsers = useUserStore(
    (state) => state.fetchUsers
  );

  const openAddModal = useUserStore(
    (state) => state.openAddModal
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            User Management
          </h1>

          <p className="mt-1 text-gray-500">
            User CRUD with Zustand state management.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center gap-2 rounded bg-blue-600 px-5 py-2 text-white"
        >
          <UserPlus size={18} />

          Add User
        </button>
      </div>

      {loading && (
        <p>Loading users...</p>
      )}

      {error && (
        <p className="mb-4 text-red-500">
          {error}
        </p>
      )}

      {!loading && (
        <UserTable />
      )}

      <UserModal />

      <DeleteConfirmModal />
    </div>
  );
};

export default UsersPage;