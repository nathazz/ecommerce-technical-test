import { Link, NavLink } from "react-router-dom";
import { useCartCount } from "../helpers/cartCount";

export function Header() {
  const cartCount = useCartCount();

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold tracking-tight">
          E-commerce
        </Link>

        <nav className="flex items-center gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-sm font-medium ${isActive ? "text-black" : "text-gray-500"}`
            }
          >
            Produtos
          </NavLink>
          <NavLink
            to="/carrinho"
            className={({ isActive }) =>
              `inline-flex items-center text-sm font-medium ${
                isActive ? "text-black" : "text-gray-500"
              }`
            }
          >
            Carrinho
            {cartCount > 0 && (
              <span className="ml-2 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-xs leading-none text-white">
                {cartCount}
              </span>
            )}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
