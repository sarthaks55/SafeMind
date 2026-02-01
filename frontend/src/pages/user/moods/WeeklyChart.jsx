import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { getWeeklyAnalytics } from "../../../api/moodService";

const WeeklyChart = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await getWeeklyAnalytics();
        if (response.success) {
          console.log(response.data);
          setData(response.data);
        } else {
          console.error(response.message);
        }
      } catch (err) {
        console.error("Failed to load weekly analytics:", err);
      }
    };
    loadData();
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
            borderColor: "#9C7FD1",
            backgroundColor: "rgba(156, 127, 209, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#8E6EC8",
            pointBorderColor: "#9C7FD1",
            pointRadius: 5
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
    </div>
  );
};

export default WeeklyChart;
