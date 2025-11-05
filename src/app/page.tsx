import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Nav } from "./components/Nav";
import { SignInForm } from "./components/auth/SignInForm";
import Footer from "./components/footer";


export default function LoginPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Nav />

      <main className="flex flex-1 items-center justify-center p-4 sm:p-6 md:p-10">
        <div className="w-full max-w-md bg-white dark:bg-card rounded-2xl shadow-lg p-6 sm:p-8 md:p-10 space-y-6 relative z-10">
          <div className="space-y-4 text-center">
            <div className="flex flex-col items-center">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-2">
                <Image src="/logos/foxlogo.svg" fill alt="Logo" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-foreground">
                Tail<span className="text-primary">Fox</span>
              </h1>
            </div>
            <p className="text-gray-500 dark:text-muted-foreground text-sm sm:text-base">
              Painel adiministrativo para gerenciamento inteligente de semaforos.
            </p>
          </div>

          <SignInForm />

          <p className="text-xs sm:text-sm text-gray-500 dark:text-muted-foreground text-center mt-4">
            Você concorda com nossos {" "}
            <Link
              href="/termos"
              className="text-primary underline hover:text-primary/80"
            >
              termos e condições
            </Link>
            .
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}