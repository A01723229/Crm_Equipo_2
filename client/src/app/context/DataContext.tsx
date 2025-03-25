import React, { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "./UserContext";

interface TaskStat {
  value: number;
  color: string;
}

interface PastDeal {
  ClientName: string;
  DealValue: number;
  Comission: number;
  DeadLine: string;
  PaymentStatus: string;
}

export interface Data {
  totalSales: number;
  totalIncome: number;
  totalCustomers: number;
  completionRate: number;
  taskStats: Record<string, TaskStat[]>;
  completedTasks: number;
  overdueTasks: number;
  tasksCloseToDeadline: { title: string; deadline: string }[];
  pastDeals: PastDeal[];
}

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
        const res = await fetch("http://localhost:3001/api/dashboard");
        if (!res.ok) throw new Error("Failed to fetch dashboard data");
        const jsonData: Data = await res.json();
        setData(jsonData);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Failed to load dashboard data");
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

