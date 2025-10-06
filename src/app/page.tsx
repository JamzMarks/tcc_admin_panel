import Link from "next/link";

import Image from "next/image";
import { Nav } from "./components/auth/Nav";
import { SignInForm } from "./components/auth/SignInForm";


export default function LoginPage() {
  return (
    <div className="relative min-h-screen flex flex-col bg-gray-100 overflow-hidden">
      <Nav />

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-10 space-y-6 relative z-10">
          
          <div className="space-y-4 text-center">
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mx-auto mb-2">
                <Image
                src={"/logos/foxlogo.svg"}
                fill
                alt="Logo"
                />
              </div>
              <h1 className="text-3xl font-bold text-gray-800">
                Tail<span className="text-primary">Fox</span>
              </h1>
            </div>
            <p className="text-gray-500 text-sm">
              Economize papel, centralize seus documentos e compartilhe de forma ecológica.
            </p>
          </div>

          <SignInForm />

          <p className="text-xs text-gray-500 text-center mt-4">
            Você concorda com nossos{" "}
            <Link href="/termos" className="text-primary underline hover:text-primary/80">
              termos e condições
            </Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
