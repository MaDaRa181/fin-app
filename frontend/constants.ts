
export const APP_NAME = "FinApp";

export const NAV_LINKS = [
  { path: "/dashboard", label: "Панель" },
  { path: "/transactions", label: "Транзакції" },
  { path: "/budgets", label: "Бюджети" },
  { path: "/reports", label: "Звіти" },
  { path: "/profile", label: "Профіль" },
];

export const FOOTER_CONTACT_EMAIL = "contact@finapp.com";
export const FOOTER_CONTACT_PHONE = "+38 (044) 777-55-22";
export const FOOTER_ADDRESS = "м. Київ, вул. Прикладна, 1";
export const FOOTER_COPYRIGHT = `© ${new Date().getFullYear()} FinApp. Всі права захищені.`;

export const DEFAULT_TRANSACTION_CATEGORIES = [
  { id: 'cat_income_salary', name: 'Зарплата', type: 'income' },
  { id: 'cat_income_bonus', name: 'Бонус', type: 'income' },
  { id: 'cat_expense_food', name: 'Їжа', type: 'expense' },
  { id: 'cat_expense_transport', name: 'Транспорт', type: 'expense' },
  { id: 'cat_expense_utilities', name: 'Комуналка', type: 'expense' },
  { id: 'cat_expense_entertainment', name: 'Розваги', type: 'expense' },
  { id: 'cat_expense_other', name: 'Інше', type: 'expense' },
];

export const MONTH_NAMES_UKR = [
  "Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
  "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
];

export const MONTH_NAMES_UKR_SHORT = [
  "Січ", "Лют", "Бер", "Кві", "Тра", "Чер",
  "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"
];
