import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navbar";
import { UserProvider } from "./context/UserContext";
import { DataProvider } from "./context/DataContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <UserProvider>
      <DataProvider>
        <html lang="en">
          <body className={inter.className}>
            <div className="flex bg-gray-100">
              <Navigation />
              <main className="flex-1">{children}</main>
            </div>
          </body>
        </html>
      </DataProvider>
    </UserProvider>
  );
}