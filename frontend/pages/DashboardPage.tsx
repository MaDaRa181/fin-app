import React, { useState, useEffect } from "react";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import ChartJsWrapper, { ChartType } from "../components/charts/ChartJsWrapper";
import { mockTransactions } from "../data/mockData";
import { Transaction, TransactionType, ChartJsData } from "../types";
import { MONTH_NAMES_UKR_SHORT } from "../constants";

const DashboardPage: React.FC = () => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(mockTransactions);

  const totalIncome = transactions
    .filter((t) => t.type === TransactionType.INCOME)
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === TransactionType.EXPENSE)
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;
  const lastTransaction =
    transactions.length > 0
      ? transactions.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )[0]
      : null;

  const expenseCategoriesData = transactions
    .filter((t) => t.type === TransactionType.EXPENSE)
    .reduce((acc, curr) => {
      const category = curr.categoryName || "Інше";
      acc[category] = (acc[category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieChartData: ChartJsData = {
    labels: Object.keys(expenseCategoriesData),
    datasets: [
      {
        data: Object.values(expenseCategoriesData),
        backgroundColor: [
          "rgba(79,140,255,0.85)",
          "rgba(255,179,71,0.85)",
          "rgba(76,175,80,0.85)",
          "rgba(255,107,107,0.85)",
          "rgba(136,136,136,0.85)",
          "rgba(153, 102, 255, 0.85)",
          "rgba(255, 159, 64, 0.85)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const monthlyExpensesData: { [key: string]: number } = {};
  transactions
    .filter((t) => t.type === TransactionType.EXPENSE)
    .forEach((t) => {
      const month = new Date(t.date).getMonth();
      const monthKey = MONTH_NAMES_UKR_SHORT[month];
      monthlyExpensesData[monthKey] =
        (monthlyExpensesData[monthKey] || 0) + t.amount;
    });

  const uniqueMonths = [
    ...new Set(
      transactions.map(
        (t) => MONTH_NAMES_UKR_SHORT[new Date(t.date).getMonth()]
      )
    ),
  ].slice(0, 6);
  const displayMonths =
    uniqueMonths.length === 6
      ? uniqueMonths
      : MONTH_NAMES_UKR_SHORT.slice(0, 6);

  const barChartData: ChartJsData = {
    labels: displayMonths,
    datasets: [
      {
        label: "Витрати",
        data: displayMonths.map((month) => monthlyExpensesData[month] || 0),
        backgroundColor: "rgba(79,140,255,0.7)",
        borderRadius: 8,
        maxBarThickness: 32,
      },
    ],
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 space-y-6">
          <Card title="Швидка статистика" titleClassName="text-lg">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-text-muted">Остання транзакція</p>
                {lastTransaction ? (
                  <p
                    className={`text-lg font-semibold ${
                      lastTransaction.type === TransactionType.EXPENSE
                        ? "text-danger"
                        : "text-success"
                    }`}
                  >
                    {lastTransaction.type === TransactionType.EXPENSE
                      ? "-"
                      : "+"}
                    {lastTransaction.amount.toLocaleString("uk-UA")} ₴
                  </p>
                ) : (
                  <p className="text-lg font-semibold text-text-muted">Немає</p>
                )}
              </div>
              <div>
                <p className="text-sm text-text-muted">Загальні заощадження</p>
                <p className="text-lg font-semibold text-success">
                  {(balance > 0 ? balance * 0.1 : 0).toLocaleString("uk-UA")} ₴
                </p>
              </div>
            </div>
          </Card>
        </aside>

        <main className="md:col-span-3 space-y-6">
          <section className="grid grid-cols-1 gap-6">
            <Card title="Зведення рахунку" titleClassName="text-xl">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-text-muted">Загальний дохід</span>
                  <span className="font-semibold text-success">
                    {totalIncome.toLocaleString("uk-UA")} ₴
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-muted">Загальні витрати</span>
                  <span className="font-semibold text-danger">
                    {totalExpenses.toLocaleString("uk-UA")} ₴
                  </span>
                </div>
                <hr className="my-2" />
                <div className="flex justify-between">
                  <span className="text-text-muted text-lg">Баланс</span>
                  <span className="font-bold text-xl text-primary">
                    {balance.toLocaleString("uk-UA")} ₴
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <Button
                  onClick={() => alert("Перехід до деталей (не реалізовано)")}
                  className="w-full sm:w-auto"
                >
                  Детальніше
                </Button>
              </div>
            </Card>
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Витрати за категоріями" titleClassName="text-lg">
              <ChartJsWrapper type="pie" data={pieChartData} height="250px" />
            </Card>
            <Card title="Місячна динаміка витрат" titleClassName="text-lg">
              <ChartJsWrapper type="bar" data={barChartData} height="250px" />
            </Card>
          </section>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
