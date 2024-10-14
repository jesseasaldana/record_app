import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import ThemeToggle from "../ui/ThemeToggle";

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-gray-800 dark:text-white">
            Chat App
          </Link>
          <div className="flex items-center">
            <ThemeToggle />
            {session ? (
              <>
                <span className="ml-4 text-gray-600 dark:text-gray-300">{session.user?.email}</span>
                <button
                  onClick={() => signOut()}
                  className="ml-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/login" className="ml-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;