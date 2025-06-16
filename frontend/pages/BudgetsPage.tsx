import React, { useState } from "react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { mockBudgetCategories } from "../data/mockData";
import { BudgetCategory } from "../types";

const BudgetsPage: React.FC = () => {
  const [budgetCategories, setBudgetCategories] =
    useState<BudgetCategory[]>(mockBudgetCategories);
  const [plannedIncome, setPlannedIncome] = useState("5000");
  const [plannedExpenses, setPlannedExpenses] = useState("3000");
  const [savingsGoal, setSavingsGoal] = useState("1000");

  const totalPlanned = budgetCategories.reduce(
    (sum, cat) => sum + cat.planned,
    0
  );
  const totalActual = budgetCategories.reduce(
    (sum, cat) => sum + cat.actual,
    0
  );

  const overallBudget = parseFloat(plannedIncome) - parseFloat(plannedExpenses);
  const spentPercentage =
    totalPlanned > 0 ? (totalActual / totalPlanned) * 100 : 0;

  const handleSaveBudget = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Бюджет збережено (симуляція)");
    console.log({
      plannedIncome,
      plannedExpenses,
      savingsGoal,
      budgetCategories,
    });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 space-y-6">
          <Card title="Швидка статистика" titleClassName="text-lg">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-text-muted">Бюджет цього місяця</p>
                <p className="text-lg font-semibold text-primary">
                  {overallBudget.toLocaleString("uk-UA")} ₴
                </p>
              </div>
              <div>
                <p className="text-sm text-text-muted">Ціль заощаджень</p>
                <p className="text-lg font-semibold text-success">
                  {parseFloat(savingsGoal).toLocaleString("uk-UA")} ₴
                </p>
              </div>
            </div>
          </Card>
        </aside>

        <main className="md:col-span-3 space-y-6">
          <Card>
            <h2 className="text-xl font-semibold text-primary mb-4">
              Планувальник бюджету
            </h2>
            <form
              onSubmit={handleSaveBudget}
              className="bg-slate-50 p-4 rounded-lg space-y-4 mb-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Input
                  id="plannedIncome"
                  type="number"
                  label="Плановий дохід (₴)"
                  value={plannedIncome}
                  onChange={(e) => setPlannedIncome(e.target.value)}
                  placeholder="5000"
                />
                <Input
                  id="plannedExpenses"
                  type="number"
                  label="Планові витрати (₴)"
                  value={plannedExpenses}
                  onChange={(e) => setPlannedExpenses(e.target.value)}
                  placeholder="3000"
                />
                <Input
                  id="savingsGoal"
                  type="number"
                  label="Ціль заощаджень (₴)"
                  value={savingsGoal}
                  onChange={(e) => setSavingsGoal(e.target.value)}
                  placeholder="1000"
                />
              </div>
              <Button
                type="submit"
                variant="success"
                className="w-full sm:w-auto"
              >
                Зберегти бюджет
              </Button>
            </form>

            <h3 className="text-lg font-semibold text-text-main mb-3">
              Виконання бюджету за категоріями
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-text-main">
                <thead className="text-xs text-primary uppercase bg-slate-100">
                  <tr>
                    <th scope="col" className="px-4 py-3">
                      Категорія
                    </th>
                    <th scope="col" className="px-4 py-3 text-right">
                      Заплановано (₴)
                    </th>
                    <th scope="col" className="px-4 py-3 text-right">
                      Фактичні (₴)
                    </th>
                    <th scope="col" className="px-4 py-3 text-right">
                      Різниця (₴)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {budgetCategories.map((cat) => (
                    <tr
                      key={cat.id}
                      className="bg-bg-card border-b border-slate-200 hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 font-medium">{cat.name}</td>
                      <td className="px-4 py-3 text-right">
                        {cat.planned.toLocaleString("uk-UA")}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {cat.actual.toLocaleString("uk-UA")}
                      </td>
                      <td
                        className={`px-4 py-3 font-medium text-right ${
                          cat.difference >= 0 ? "text-success" : "text-danger"
                        }`}
                      >
                        {cat.difference >= 0 ? "+" : ""}
                        {cat.difference.toLocaleString("uk-UA")}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="font-semibold bg-slate-100">
                  <tr>
                    <td className="px-4 py-3">Всього</td>
                    <td className="px-4 py-3 text-right">
                      {totalPlanned.toLocaleString("uk-UA")} ₴
                    </td>
                    <td className="px-4 py-3 text-right">
                      {totalActual.toLocaleString("uk-UA")} ₴
                    </td>
                    <td
                      className={`px-4 py-3 text-right ${
                        totalPlanned - totalActual >= 0
                          ? "text-success"
                          : "text-danger"
                      }`}
                    >
                      {totalPlanned - totalActual >= 0 ? "+" : ""}
                      {(totalPlanned - totalActual).toLocaleString("uk-UA")} ₴
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-6">
              <h3 className="text-md font-semibold text-text-main mb-1">
                Індикатор витраченого бюджету
              </h3>
              <div className="w-full bg-slate-200 rounded-full h-4.5 dark:bg-slate-700">
                <div
                  className="bg-primary h-4.5 rounded-full"
                  style={{
                    width: `${Math.min(spentPercentage, 100).toFixed(0)}%`,
                  }}
                ></div>
              </div>
              <p className="text-sm text-text-muted mt-1 text-right">
                {spentPercentage.toFixed(0)}% витрачено
              </p>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default BudgetsPage;
