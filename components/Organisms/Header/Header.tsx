"use client";
import AppButton from "@/components/Atoms/AppButton/AppButton";
import Logo from "@/styles/assets/logo.svg";
import Menu from "@/styles/assets/menu.svg";
import Link from "next/link";
import { routes } from "./Header.utils";
import { usePathname } from "next/navigation";
import { useState } from "react";
const Header = () => {
  const pathName = usePathname();
  const [showNav, setShowNav] = useState(false);
  const isActiveRoute = (routeName: string) => pathName === routeName;

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap justify-between items-center mx-auto p-3">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex lg:order-2 lg:ml-auto">
          <Link href="" className="hidden lg:block">
            <AppButton>Prijavi se</AppButton>
          </Link>
          <button
            onClick={() => setShowNav(!showNav)}
            type="button"
            className="inline-flex items-center px-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <Menu />
          </button>
        </div>
        <div
          className={`items-center justify-between  ${
            !showNav && "hidden"
          } w-full lg:flex lg:w-auto lg:order-1 lg:ml-3`}
        >
          <ul className="flex flex-col p-4 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
            {routes.map((route) => (
              <li
                key={route.path}
                className={`block py-2 lg:pl-3 pr-4 hover:text-blue-700 lg:p-0 ${
                  isActiveRoute(route.path) ? "text-blue-800 font-bold" : ""
                }`}
              >
                <Link href={route.path}>{route.name}</Link>
              </li>
            ))}
            <Link href="/" className="lg:hidden">
              <AppButton>Prijavi se</AppButton>
            </Link>
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Header;
