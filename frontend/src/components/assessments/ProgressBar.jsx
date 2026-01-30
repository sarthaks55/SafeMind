const ProgressBar = ({ total, answered }) => {
  const percent = Math.round((answered / total) * 100);

  return (
    <div>
      <p>{answered} / {total} answered</p>
      <div style={{ background: "#ddd", height: "8px" }}>
        <div style={{
          width: `${percent}%`,
          background: "#4CAF50",
          height: "8px"
        }} />
      </div>
    </div>
  );
};

export default ProgressBar;
