import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/navbar";
import { UserProvider } from "./context/UserContext";
import { DataProvider } from "./context/DataContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <DataProvider>
      <UserProvider>
        <html lang="en">
          <body className={inter.className}>
            <div className="flex">
              <Navigation />
              <main className="flex-1">{children}</main>
            </div>
          </body>
        </html>
      </UserProvider>
    </DataProvider>
  );
}
