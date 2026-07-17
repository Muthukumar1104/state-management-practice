import { useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useAuthStore } from "../store/authsSore";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const login = useAuthStore(
    (state) => state.login
  );

  const loading = useAuthStore(
    (state) => state.loading
  );

  const error = useAuthStore(
    (state) => state.error
  );

  const [email, setEmail] = useState(
    "admin@example.com"
  );

  const [password, setPassword] = useState(
    "admin123"
  );

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const success = await login({
      email,
      password,
    });

    if (!success) {
      return;
    }

    const from =
      location.state?.from?.pathname ??
      "/dashboard";

    navigate(from, {
      replace: true,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow">
        <h1 className="mb-2 text-2xl font-bold">
          Login
        </h1>

        <p className="mb-6 text-sm text-gray-500">
          Login to continue
        </p>

        {error && (
          <div className="mb-4 rounded bg-red-100 p-3 text-red-600">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
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
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              required
              className="w-full rounded border p-3"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-blue-600 p-3 text-white disabled:opacity-50"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;