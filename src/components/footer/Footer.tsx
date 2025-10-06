import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-[var(--background)] text-[var(--foreground)]">
      <div className="mx-auto max-w-7xl px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} TailFox. Todos os direitos
          reservados.
        </p>
        <div className="flex items-center gap-4">

          <Link href="/terms" className="text-sm hover:underline">
            Terms & Privacy
          </Link>
        </div>
      </div>
    </footer>
  );
};
