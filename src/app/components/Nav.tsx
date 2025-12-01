import Link from "next/link";
import Image from "next/image";

export const Nav = () => {
  return (
    <nav
      className="mx-auto w-full max-w-[1024px] px-6 py-4 my-4
      flex items-center justify-between
      rounded-2xl border bg-white shadow-sm
      dark:bg-neutral-900 dark:border-neutral-800 dark:shadow-none"
    >
      <div className="flex gap-2 items-center align-middle">
        <div className="relative w-6 h-6 mx-auto flex align-middle ">
          <Image src="/logos/logo_m.svg" fill alt="Logo" />
        </div>
        <h1
          className="text-2xl font-bold tracking-tight 
        text-neutral-800 dark:text-neutral-200"
        >
          TailFox Panel
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <Link
          href="/terms"
          className="text-neutral-600 dark:text-neutral-400 
          hover:text-neutral-900 dark:hover:text-white
          transition-colors font-medium"
        >
          Termos
        </Link>

        <Link
          href="/"
          className="text-neutral-600 dark:text-neutral-400 
          hover:text-primary dark:hover:text-primary
          transition-colors font-medium"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};
