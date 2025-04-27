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
      console.log("All Deals from server:", jsonData.allDeals);
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
    const res = await fetch(`https://crm-equipo-2.vercel.app/api/${section}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Add failed:", errorText);
      throw new Error("Failed to add item");
    }
    await fetchData();
  };
  
  const modifyItem = async (section: string, id: string, payload: any) => {
    try {
      const response = await fetch(`https://crm-equipo-2.vercel.app/api/${section}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
  
      const responseText = await response.text();
      console.log("Response Text:", responseText);
  
      if (!response.ok) {
        console.error("Modify failed:", responseText);
      } else {
        console.log("Modify succeeded");
        await fetchData(); // <-- THIS was missing
      }
    } catch (err) {
      console.error("Modify request error:", err);
      throw err;
    }
  };
  
  const deleteItem = async (section: string, id: string) => {
    const res = await fetch(`https://crm-equipo-2.vercel.app/api/${section}/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      const errorText = await res.text();
      console.error("Delete failed:", errorText);
      throw new Error("Failed to delete item");
    }
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
