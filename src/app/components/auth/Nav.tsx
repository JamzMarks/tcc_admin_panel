import Link from "next/link";

export const Nav = () => {
  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center rounded-2xl my-4 ">
      <h1 className="text-xl font-bold text-gray-800">TailFox Admin</h1>
      <div className="space-x-4">
        <Link
          href="/termos"
          className="text-gray-600 hover:text-primary transition-colors"
        >
          Termos
        </Link>
        <Link
          href="/"
          className="text-gray-600 hover:text-primary transition-colors"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};
