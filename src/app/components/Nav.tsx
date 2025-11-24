import Link from "next/link";

export const Nav = () => {
  return (
    <nav className="mx-auto w-full max-w-[1024px] bg-white dark:bg-background dark:text-foreground shadow-md py-4 px-6 flex justify-between items-center rounded-2xl my-4 dark:border-b-2 ">
      <h1 className="text-xl font-semibold ">TailFox Panel</h1>
      <div className="space-x-4">
        <Link
          href="/terms"
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
