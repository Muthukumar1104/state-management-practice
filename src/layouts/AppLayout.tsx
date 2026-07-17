import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

const AppLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-900 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold">
            State Management Practice
          </h1>

          <nav className="flex items-center gap-6">
            <NavLink to="/dashboard">
              Dashboard
            </NavLink>

            <NavLink to="/users">
              Users
            </NavLink>

            <NavLink to="/products">
              Products
            </NavLink>

            <button
              onClick={handleLogout}
              className="rounded bg-red-500 px-4 py-2"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;