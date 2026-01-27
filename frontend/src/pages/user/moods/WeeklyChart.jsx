import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getWeeklyAnalytics } from "../../../api/moodService";

const WeeklyChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    getWeeklyAnalytics().then(res => setData(res.data));
  }, []);

  if (!data) return null;

  return (
    <div className="card p-3 mb-4">
      <h5>Weekly Mood Trend</h5>
      <p>Average Mood: {data.averageMood}</p>

      <Line
        data={{
          labels: data.dailyStats.map(d => d.date),
          datasets: [{
            label: "Mood Score",
            data: data.dailyStats.map(d => d.moodScore),
            borderWidth: 2
          }]
        }}
      />
    </div>
  );
};

export default WeeklyChart;
