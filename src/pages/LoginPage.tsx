import {
  type FormEvent,
  useState,
} from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import { login } from "../services/authService";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(
    "admin@example.com"
  );

  const [password, setPassword] = useState(
    "admin123"
  );

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await login({
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.user)
      );

      const from =
        location.state?.from?.pathname ||
        "/dashboard";

      navigate(from, {
        replace: true,
      });
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Login failed"
      );
    } finally {
      setLoading(false);
    }
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
            <label className="mb-1 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              className="w-full rounded border p-3"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              className="w-full rounded border p-3"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded bg-blue-600 p-3 text-white disabled:opacity-50"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </form>

        <div className="mt-5 rounded bg-gray-100 p-3 text-sm">
          <p>admin@example.com</p>
          <p>admin123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;