const UserForm = () => {
  return (
    <form className="space-y-4">
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
          className="w-full rounded border p-3"
        >
          <option value="Admin">Admin</option>
          <option value="Developer">Developer</option>
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
          className="w-full rounded border p-3"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="button"
          className="rounded bg-gray-200 px-5 py-2"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="rounded bg-blue-600 px-5 py-2 text-white"
        >
          Create
        </button>
      </div>
    </form>
  );
};

export default UserForm;