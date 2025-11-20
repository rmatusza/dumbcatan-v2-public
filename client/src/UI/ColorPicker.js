import { PLAYER_COLORS } from "../Utils/constants";

const ColorPicker = ({ selectedColor, setSelectedColor, customColors }) => {
  const colors = customColors || PLAYER_COLORS;
  const svgWidth = 400;
  const svgHeight = 100;
  const spacing = svgWidth / (colors.length + 1);

  const colorData = colors.map((color, i) => ({
    color,
    cx: spacing * (i + 1),
  }));

  return (
    <div className="flex justify-center mt-auto pb-5">
      <svg
        viewBox="0 0 400 100"
        className="w-full max-w-md h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        {colorData.map(({ color, cx }) => (
          <>
            {/* outter circle that highlights user selection */}
            <circle
              key={`ring-${color}`}
              cx={cx}
              cy={svgHeight / 2}
              r={28}
              fill="none"
              stroke="yellow"
              strokeWidth={6}
              visibility={selectedColor === color ? 'visible' : 'hidden'}
            />
            {/* color icon that has to be clicked to make selection */}
            <circle
              key={color}
              cx={cx}
              cy={svgHeight / 2}
              r={20}
              fill={color}
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedColor(color)}
            />
          </>
        ))}
      </svg>
    </div>
  );
}

export default ColorPicker;