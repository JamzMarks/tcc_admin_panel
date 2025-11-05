import React from "react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background text-foreground py-8 px-4 md:px-12">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h3 className="text-lg font-semibold">TailFox</h3>
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Todos os direitos reservados.</p>
        </div>

        <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
          <Link href="/about" className="hover:text-foreground transition-colors">Sobre</Link>
          <Separator orientation="vertical" className="h-4" />
          <Link href="/terms" className="hover:text-foreground transition-colors">Termos & Privacidade</Link>
          <Separator orientation="vertical" className="h-4" />
          <Link href="/contact" className="hover:text-foreground transition-colors">Contato</Link>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.423 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.464-1.11-1.464-.908-.622.069-.609.069-.609 1.003.07 1.531 1.033 1.531 1.033.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.089.636-1.34-2.22-.254-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.03-2.686-.104-.253-.447-1.273.098-2.654 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.53 9.53 0 0 1 2.504.336c1.91-1.295 2.748-1.026 2.748-1.026.546 1.381.203 2.401.1 2.654.642.699 1.03 1.593 1.03 2.686 0 3.849-2.339 4.694-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.416-.012 2.744 0 .268.18.58.688.482A10.026 10.026 0 0 0 22 12.021C22 6.484 17.523 2 12 2Z"></path></svg>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2Z"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
