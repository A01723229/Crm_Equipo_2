'use client';
import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";
import { Data } from "../interfaces/data";

interface DataContextProps {
  data: Data | null;
  loading: boolean;
  error: string | null;
  refreshData: () => void;
  addItem: (section: string, payload: any) => Promise<void>;
  modifyItem: (section: string, id: string, payload: any) => Promise<void>;
  deleteItem: (section: string, id: string) => Promise<void>;
}

const DataContext = createContext<DataContextProps>({
  data: null,
  loading: true,
  error: null,
  refreshData: () => {},
  addItem: async () => {},
  modifyItem: async () => {},
  deleteItem: async () => {},
});

export const useData = () => useContext(DataContext);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useUser();
  const isUser = user?.isLogin;
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!isUser) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("https://crm-equipo-2.vercel.app/api/data", {
        credentials: 'include',
      });
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

  useEffect(() => {
    fetchData();
  }, [isUser]);

  // --- CRUD FUNCTIONS ---
  const addItem = async (section: string, payload: any) => {
    await fetch(`/api/${section}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    await fetchData();
  };

  const modifyItem = async (section: string, id: string, payload: any) => {
    await fetch(`/api/${section}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    await fetchData();
  };

  const deleteItem = async (section: string, id: string) => {
    await fetch(`/api/${section}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    await fetchData();
  };

  return (
    <DataContext.Provider
      value={{
        data,
        loading,
        error,
        refreshData: fetchData,
        addItem,
        modifyItem,
        deleteItem,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
