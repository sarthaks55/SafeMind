import MoodForm from "./MoodForm";
import WeeklyChart from "./WeeklyChart";
import MonthlyChart from "./MonthlyChart";

const MoodDashboard = () => {
  return (
    <>
      <h3>Mood Tracker </h3>
      <MoodForm />
      <WeeklyChart />
      <MonthlyChart />
    </>
  );
};

export default MoodDashboard;
