import { useEffect, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { getMonthlyAnalytics } from "../../../api/moodService";

const MonthlyChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const now = new Date();
    getMonthlyAnalytics(
      now.getFullYear(),
      now.getMonth() + 1
    ).then(res => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <div className="card p-3">
      <h5>Monthly Mood Overview</h5>

      <Bar
        data={{
          labels: data.dailyStats.map(d => d.date),
          datasets: [{
            label: "Mood",
            data: data.dailyStats.map(d => d.moodScore),
            backgroundColor: "rgba(156, 127, 209, 0.6)",
            borderColor: "#9C7FD1",
            borderWidth: 2
          }]
        }}
        options={{
          plugins: {
            legend: {
              labels: {
                color: "#8E6EC8"
              }
            }
          },
          scales: {
            y: {
              ticks: {
                color: "#8E6EC8"
              }
            },
            x: {
              ticks: {
                color: "#8E6EC8"
              }
            }
          }
        }}
      />

      <Pie
        data={{
          labels: Object.keys(data.moodDistribution),
          datasets: [{
            data: Object.values(data.moodDistribution),
            backgroundColor: [
              "#9C7FD1",
              "#B39DDB",
              "#C6B7E2",
              "#D1C4E9",
              "#E1BEE7"
            ],
            borderColor: "#8E6EC8",
            borderWidth: 2
          }]
        }}
        options={{
          plugins: {
            legend: {
              labels: {
                color: "#8E6EC8"
              }
            }
          }
        }}
      />
    </div>
  );
};

export default MonthlyChart;
