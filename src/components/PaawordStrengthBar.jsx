const PassStrengthBar = ({ passStrength }) => {
  let barWidth = 0;

  switch (passStrength) {
    case 0:
      barWidth = 25;
      break;
    case 1:
      barWidth = 50;
      break;
    case 2:
      barWidth = 75;
      break;
    case 3:
      barWidth = 100;
      break;
    default:
      break;
  }

  const barColor = () => {
    switch (passStrength) {
      case 0:
        return "#EA1111";
      case 1:
        return "#FFD700";
      case 2:
        return "#00BFFF";
      case 3:
        return "#00FF00";
      default:
        return "none";
    }
  };

  const changeColor = () => ({
    width: `${barWidth}%`,
    background: barColor(),
    height: "7px",
    borderRadius: "20px",
    transition: "width 0.5s",
  });

  return (
    <div className="bg-slate-800 rounded-xl h-2">
      <div style={changeColor()}></div>
    </div>
  );
};

export default PassStrengthBar;
