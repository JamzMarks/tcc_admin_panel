import { DashboardSidebar } from "./components/DashboardSidebar/DashboardSidebar";
import { UIProvider } from "@/context/ui-context";
import { Navbar } from "@/components/navbar/Navbar";
import { UserProvider } from "@/context/user-context";
import { AuthClient } from "@/services/auth.service";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <UIProvider>
        <div>
          <header>
            <Navbar></Navbar>
          </header>

          <main className="relative flex pt-20 lg:pl-60">
            <div className="flex-shrink-0  ">
              <DashboardSidebar />
            </div>
            <section className="flex-1 min-h-[calc(100vh-80px)] overflow-auto py-4 px-4 bg-gray-100 dark:bg-background-dark">
              {children}
            </section>
          </main>
        </div>
      </UIProvider>
    </UserProvider>
  );
}
