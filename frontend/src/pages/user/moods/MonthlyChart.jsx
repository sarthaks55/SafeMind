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
            data: data.dailyStats.map(d => d.moodScore)
          }]
        }}
      />

      <Pie
        data={{
          labels: Object.keys(data.moodDistribution),
          datasets: [{
            data: Object.values(data.moodDistribution)
          }]
        }}
      />
    </div>
  );
};

export default MonthlyChart;
