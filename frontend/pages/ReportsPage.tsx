import React, { useState } from "react";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import ChartJsWrapper from "../components/charts/ChartJsWrapper";
import { ChartJsData } from "../types";
import { MONTH_NAMES_UKR_SHORT, MONTH_NAMES_UKR } from "../constants";

const ReportsPage: React.FC = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const annualChartData: ChartJsData = {
    labels: MONTH_NAMES_UKR,
    datasets: [
      {
        label: "Витрати",
        data: [500, 700, 600, 800, 650, 750, 900, 850, 700, 600, 650, 800],
        borderColor: "rgba(79,140,255,1)",
        backgroundColor: "rgba(79,140,255,0.15)",
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointBackgroundColor: "rgba(79,140,255,1)",
      },
    ],
  };

  const categoryChartData: ChartJsData = {
    labels: ["Їжа", "Транспорт", "Комуналка", "Розваги", "Інше"],
    datasets: [
      {
        data: [3200, 1800, 2400, 1200, 2000],
        backgroundColor: [
          "rgba(79,140,255,0.85)",
          "rgba(255,179,71,0.85)",
          "rgba(76,175,80,0.85)",
          "rgba(255,107,107,0.85)",
          "rgba(136,136,136,0.85)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleGenerateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      alert("Будь ласка, оберіть період.");
      return;
    }
    console.log(`Generating report from ${startDate} to ${endDate}`);
    alert("Генерація звіту (симуляція)");
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 space-y-6">
          <Card title="Швидка статистика" titleClassName="text-lg">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-text-muted">
                  Річні заощадження (прогноз)
                </p>
                <p className="text-lg font-semibold text-success"></p>
              </div>
              <div>
                <p className="text-sm text-text-muted">
                  Середні місячні витрати
                </p>
                <p className="text-lg font-semibold text-danger"></p>
              </div>
            </div>
          </Card>
        </aside>

        <main className="md:col-span-3 space-y-6">
          <Card>
            <h2 className="text-xl font-semibold text-primary mb-4">
              Формування звітів
            </h2>
            <form
              onSubmit={handleGenerateReport}
              className="bg-slate-50 p-4 rounded-lg flex flex-col sm:flex-row items-end gap-4 mb-6"
            >
              <Input
                id="startDate"
                type="date"
                label="Початкова дата"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                containerClassName="flex-grow mb-0"
              />
              <Input
                id="endDate"
                type="date"
                label="Кінцева дата"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                containerClassName="flex-grow mb-0"
              />
              <Button type="submit" className="w-full sm:w-auto mt-2 sm:mt-0">
                Згенерувати
              </Button>
            </form>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card title="Річна динаміка витрат" titleClassName="text-lg">
              <ChartJsWrapper
                type="line"
                data={annualChartData}
                height="300px"
              />
            </Card>
            <Card
              title="Розподіл витрат за категоріями (Рік)"
              titleClassName="text-lg"
            >
              <ChartJsWrapper
                type="doughnut"
                data={categoryChartData}
                height="300px"
              />
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportsPage;
