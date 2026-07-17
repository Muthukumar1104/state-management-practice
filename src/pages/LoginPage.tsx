const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h1 className="mb-2 text-2xl font-bold">
          Login
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Login to continue
        </p>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium"
            >
              Email
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter email"
              className="w-full rounded border p-3"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium"
            >
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter password"
              className="w-full rounded border p-3"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-blue-600 p-3 text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;