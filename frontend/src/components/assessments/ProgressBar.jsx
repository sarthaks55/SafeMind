const ProgressBar = ({ total, answered }) => {
  const percent = Math.round((answered / total) * 100);

  return (
    <div style={{ marginBottom: "30px" }}>
      <p style={{ color: "#7A5BC7", fontWeight: "500", marginBottom: "8px" }}>{answered} / {total} answered</p>
      <div style={{ 
        background: "#C6B7E2", 
        height: "8px", 
        borderRadius: "4px",
        overflow: "hidden"
      }}>
        <div style={{
          width: `${percent}%`,
          background: "linear-gradient(90deg, #8E6EC8 0%, #7A5BC7 100%)",
          height: "8px",
          transition: "width 0.3s ease"
        }} />
      </div>
    </div>
  );
};

export default ProgressBar;
