export interface Category {
  id: string;
  name: string;
  type: "income" | "expense";
  user: string;
}

export enum TransactionType {
  INCOME = "income",
  EXPENSE = "expense",
}

export interface Transaction {
  id: string;
  user: string;
  category: Category;
  categoryId: string;
  amount: number;
  date: string;
  description: string;
  type: TransactionType;
}

export interface BudgetCategory {
  id: string;
  user: string;
  category: Category;
  planned: number;
  actual: number;
  difference: number;
}
export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
  initials?: string;
}
