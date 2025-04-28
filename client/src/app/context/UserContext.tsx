// UserContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from "../interfaces/user"; // Ensure your interface includes SellerID, etc.

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me", { credentials: "include" });

        if (res.ok) {
          const userData = await res.json();

          // Check if user is logged in based on server response
          if (userData && userData.sellerName && userData.email) {
            setUser({ ...userData, isLogin: true });
          } else {
            setUser(null); // If user data is incomplete, set null
          }
        } else {
          setUser(null); // If the request fails, set user to null
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser(null); // Set user to null if error occurs
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
