import { Transaction, TransactionType, BudgetCategory, User } from "../types";
import { DEFAULT_TRANSACTION_CATEGORIES } from "../constants";

export const mockUser: User = {
  id: "user1",
  username: "Влад Бондаренко",
  email: "bondvlad@gmail.com",
  createdAt: "2024-01-01",
  initials: "ВБ",
};

export const mockTransactions: Transaction[] = [
  {
    id: "t1",
    userId: "user1",
    categoryId: "cat_income_salary",
    categoryName: "Дохід",
    amount: 5000,
    date: "2025-05-10",
    description: "Зарплата",
    type: TransactionType.INCOME,
  },
  {
    id: "t2",
    userId: "user1",
    categoryId: "cat_expense_food",
    categoryName: "Їжа",
    amount: 50,
    date: "2025-05-10",
    description: "Кава",
    type: TransactionType.EXPENSE,
  },
  {
    id: "t3",
    userId: "user1",
    categoryId: "cat_expense_transport",
    categoryName: "Транспорт",
    amount: 30,
    date: "2025-05-09",
    description: "Метро",
    type: TransactionType.EXPENSE,
  },
  {
    id: "t4",
    userId: "user1",
    categoryId: "cat_expense_utilities",
    categoryName: "Комуналка",
    amount: 200,
    date: "2025-05-08",
    description: "Інтернет",
    type: TransactionType.EXPENSE,
  },
  {
    id: "t5",
    userId: "user1",
    categoryId: "cat_expense_entertainment",
    categoryName: "Розваги",
    amount: 120,
    date: "2025-05-07",
    description: "Кіно",
    type: TransactionType.EXPENSE,
  },
  {
    id: "t6",
    userId: "user1",
    categoryId: "cat_expense_other",
    categoryName: "Інше",
    amount: 100,
    date: "2025-05-06",
    description: "Подарунок",
    type: TransactionType.EXPENSE,
  },
  {
    id: "t7",
    userId: "user1",
    categoryId: "cat_income_bonus",
    categoryName: "Дохід",
    amount: 200,
    date: "2025-05-05",
    description: "Бонус",
    type: TransactionType.INCOME,
  },
  {
    id: "t8",
    userId: "user1",
    categoryId: "cat_expense_food",
    categoryName: "Їжа",
    amount: 80,
    date: "2025-05-04",
    description: "Обід",
    type: TransactionType.EXPENSE,
  },
  {
    id: "t9",
    userId: "user1",
    categoryId: "cat_expense_transport",
    categoryName: "Транспорт",
    amount: 70,
    date: "2025-05-03",
    description: "Таксі",
    type: TransactionType.EXPENSE,
  },
  {
    id: "t10",
    userId: "user1",
    categoryId: "cat_expense_other",
    categoryName: "Інше",
    amount: 50,
    date: "2025-05-02",
    description: "Книга",
    type: TransactionType.EXPENSE,
  },
];

export const mockBudgetCategories: BudgetCategory[] = [
  {
    id: "budget_cat1",
    name: "Їжа",
    planned: 800,
    actual: 700,
    difference: 100,
  },
  {
    id: "budget_cat2",
    name: "Транспорт",
    planned: 400,
    actual: 420,
    difference: -20,
  },
  {
    id: "budget_cat3",
    name: "Розваги",
    planned: 300,
    actual: 250,
    difference: 50,
  },
  {
    id: "budget_cat4",
    name: "Інше",
    planned: 500,
    actual: 600,
    difference: -100,
  },
];

export const getCategoryNameById = (categoryId: string): string => {
  const category = DEFAULT_TRANSACTION_CATEGORIES.find(
    (cat) => cat.id === categoryId
  );
  return category ? category.name : "Невідома категорія";
};
