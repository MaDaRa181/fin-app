import React, { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Transaction, TransactionType, Category } from "../types";
import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api";

const TransactionsPage: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [amount, setAmount] = useState("");
  const [filter, setFilter] = useState<"all" | "income" | "expense">("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const token = localStorage.getItem("finappUserToken");

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/transactions/`, {
        headers: { Authorization: `Token ${token}` },
      });
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/categories/`);
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !amount || !categoryId || !date) {
      alert("Будь ласка, заповніть усі поля.");
      return;
    }

    try {
      await axios.post(
        `${API_BASE_URL}/transactions/`,
        {
          category_id: categoryId,
          amount: parseFloat(amount),
          date: date,
          description: description,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      fetchTransactions();
      setShowAddForm(false);
      setDescription("");
      setAmount("");
      setDate(new Date().toISOString().split("T")[0]);
      setCategoryId("");
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Помилка при додаванні транзакції.");
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    try {
      await axios.delete(`${API_BASE_URL}/transactions/${id}/`, {
        headers: { Authorization: `Token ${token}` },
      });
      fetchTransactions();
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Помилка при видаленні транзакції.");
    }
  };

  const filteredTransactions = transactions
    .filter((t) => filter === "all" || t.type === filter)
    .filter(
      (t) =>
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (t.category?.name &&
          t.category.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  const totalTransactionsCount = filteredTransactions.length;
  const totalAmount = filteredTransactions.reduce((sum, t) => {
    return t.type === TransactionType.INCOME ? sum + t.amount : sum - t.amount;
  }, 0);

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 space-y-6">
          <Card title="Швидка статистика" titleClassName="text-lg">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-text-muted">Кількість транзакцій</p>
                <p className="text-lg font-semibold">
                  {totalTransactionsCount}
                </p>
              </div>
              <div>
                <p className="text-sm text-text-muted">
                  Загальна сума (зміни балансу)
                </p>
                <p
                  className={`text-lg font-semibold ${
                    totalAmount >= 0 ? "text-success" : "text-danger"
                  }`}
                >
                  {totalAmount.toLocaleString("uk-UA")} ₴
                </p>
              </div>
            </div>
          </Card>
        </aside>

        <main className="md:col-span-3 space-y-6">
          <Card>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
              <h2 className="text-xl font-semibold text-primary">
                Історія транзакцій
              </h2>
              <Button onClick={() => setShowAddForm(!showAddForm)}>
                {showAddForm ? "Скасувати" : "Додати транзакцію"}
              </Button>
            </div>

            {showAddForm && (
              <form
                onSubmit={handleAddTransaction}
                className="bg-slate-50 p-4 rounded-lg space-y-4 mb-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    id="date"
                    type="date"
                    label="Дата"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <Input
                    id="description"
                    type="text"
                    label="Опис"
                    placeholder="Напр. Продукти"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-text-muted mb-1"
                    >
                      Категорія
                    </label>
                    <select
                      id="category"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    >
                      <option value="">Оберіть категорію</option>
                      {categories && categories.length > 0 ? (
                        categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name} (
                            {cat.type === "income" ? "Дохід" : "Витрата"})
                          </option>
                        ))
                      ) : (
                        <option disabled>Немає категорій</option>
                      )}
                    </select>
                  </div>
                  <Input
                    id="amount"
                    type="number"
                    label="Сума (₴)"
                    placeholder="100.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    step="0.01"
                  />
                </div>
                <Button
                  type="submit"
                  variant="success"
                  className="w-full sm:w-auto"
                >
                  Зберегти транзакцію
                </Button>
              </form>
            )}

            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
              <Input
                type="text"
                placeholder="Пошук за описом чи категорією..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-1/2"
                containerClassName="mb-0"
              />
              <select
                value={filter}
                onChange={(e) =>
                  setFilter(e.target.value as "all" | "income" | "expense")
                }
                className="px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              >
                <option value="all">Усі</option>
                <option value="income">Дохід</option>
                <option value="expense">Витрати</option>
              </select>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-text-main">
                <thead className="text-xs text-primary uppercase bg-slate-100">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Дата
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Опис
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Категорія
                    </th>
                    <th scope="col" className="px-4 py-3 text-right">
                      Сума
                    </th>
                    <th scope="col" className="px-4 py-3 text-right">
                      Дії
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((t) => (
                    <tr
                      key={t.id}
                      className="bg-bg-card border-b border-slate-200 hover:bg-slate-50"
                    >
                      <td className="px-4 py-3">{t.date}</td>
                      <td className="px-4 py-3 font-medium">{t.description}</td>
                      <td className="px-4 py-3">{t.category?.name}</td>
                      <td
                        className={`px-4 py-3 font-medium text-right ${
                          t.type === TransactionType.INCOME
                            ? "text-success"
                            : "text-danger"
                        }`}
                      >
                        {t.type === TransactionType.INCOME ? "+" : "-"}
                        {Number(t.amount).toLocaleString("uk-UA")} ₴
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          onClick={() => handleDeleteTransaction(t.id)}
                          variant="danger"
                          size="sm"
                        >
                          Видалити
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-4 text-text-muted"
                      >
                        Транзакцій не знайдено.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default TransactionsPage;
