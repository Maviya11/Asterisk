
type CircularGraphProps = {
  expended: number;
  budget: number;
};

const CircularGraph = ({ expended, budget }: CircularGraphProps) => {
  const radius = 23; // Adjusted radius for a smaller circle
  const strokeWidth = 5; // Adjusted stroke width
  const normalizedRadius = radius - strokeWidth * 0.5;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percentage = Math.min((expended / budget) * 100, 100); // Clamp between 0 and 100
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Color interpolation (green -> yellow -> red)
  const getColor = () => {
    if (percentage <= 50) {
      const greenToYellow = 120;
      return `hsl(${greenToYellow - (percentage / 50) * 60}, 100%, 50%)`; // Green to Yellow
    } else {
      const yellowToRed = 60;
      return `hsl(${yellowToRed - ((percentage - 50) / 50) * 60}, 100%, 50%)`; // Yellow to Red
    }
  };

  return (
    <div className="relative ml-1 w-[60px] h-[60px]">
      <svg height="100%" width="100%">
        <circle
          stroke="lightgray"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={30} // Adjusted center point to match new dimensions
          cy={30}
        />
        <circle
          stroke={getColor()}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference + " " + circumference}
          style={{ strokeDashoffset }}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={30}
          cy={30}
          transform="rotate(-90 30 30)" // Rotate to start from the top
        />
      </svg>
      <div className="absolute inset-0 flex justify-center items-center text-sm font-bold text-gray-700">
        {Math.round(percentage)}%
      </div>
    </div>
  );
};

export default CircularGraph;
