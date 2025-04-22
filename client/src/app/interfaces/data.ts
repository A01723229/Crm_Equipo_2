
export interface TaskStat {
    value: number;
    color: string;
  }
  
  export interface PastDeal {
    ClientName: string;
    DealValue: number;
    Comission: number;
    DeadLine: string;
    PaymentStatus: string;
  }
  
  export interface PendingPayment {
    ClientName: string;
    Comission: number;
    PaymentDate: string;
  }
  
  export interface TopCommission {
    ClientName: string;
    Comission: number;
  }
  
  export interface Deal {
    DealID: number;
    ClientName: string;
    DealValue: number;
    Comission: number;
    DealDate: string;
    PaymentStatus: string;
  }  
  
  export interface Client {
    ClientID: number;
    ClientName: string;
    Company: string; 
    Description: string;
    Telephone: string;
    Email: string;
    SellerID: number;
  }
  

  export interface Task {
    TaskID: number;
    Title: string;
    Status: string;
    Priority: string;
    Stage: string;
    Description?: string;
    DeadLine?: string;
    DealID: number;
    SellerID?: number;
  }

  export interface Product {
    ProductID: number;
    Name: string;
    Description: string;
    Category: string;
    Price: number;
  }

  export interface Data {
    totalSales: number;
    totalIncome: number;
    totalClients: number;
    completionRate: number;
    taskStats: Record<string, TaskStat[]>;
    completedTasks: number;
    overdueTasks: number;
    tasksCloseToDeadline: { title: string; deadline: string }[];
    pastDeals: PastDeal[];
    totalCommissions: number;
    commissionRate: number;
    pendingPayments: PendingPayment[];
    topCommissions: TopCommission[];
    allDeals: Deal[];
    clientList: Client[];
    tasks: Task[];
    products: Product[];
  }