import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";
import { Data } from "../interfaces/data";

interface DataContextProps {
  data: Data | null;
  loading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextProps>({
  data: null,
  loading: true,
  error: null,
});

export const useData = () => useContext(DataContext);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useUser();
  const isUser = user?.isLogin;
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!isUser) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch("http://localhost:3001/api/data");
        if (!res.ok) throw new Error("Failed to fetch data");
        const jsonData: Data = await res.json();
        setData(jsonData);
      } catch (err) {
        console.error("Data fetch error:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [isUser]);

  return (
    <DataContext.Provider value={{ data, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};