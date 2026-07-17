import { UserPlus2 } from "lucide-react"
import UserModal from "../components/users/UserModal";
import UserTable from "../components/users/UserTable";

const UsersPage = () => {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            User Management
          </h1>
          <p className="mt-1 text-gray-500">
            Practice CRUD operations using different
            state management libraries.
          </p>
        </div>
         <button
          type="button"
          className="flex items-center gap-2 rounded bg-blue-600 px-5 py-2 text-white"
        >
          <UserPlus2 size={18} />
          Add User
        </button>
      </div>
      <UserTable />
      <UserModal />
    </div>
  );
};

export default UsersPage;