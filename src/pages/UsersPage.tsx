import UserForm from "../components/users/UserForm";
import UserTable from "../components/users/UserTable";

const UsersPage = () => {
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
        <UserForm />

        <div>
          <UserTable />
        </div>
      </div>
    </div>
  );
};

export default UsersPage;