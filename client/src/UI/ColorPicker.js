import { PLAYER_COLORS, CUSTOM_STYLES as S } from "../Utils/constants";
import Button from "./Button";
import Modal from "./Modal";

const ColorPicker = ({ selectedColor, setSelectedColor, customColors = null, buttons, noColorSelected, background }) => {
  const colors = customColors || PLAYER_COLORS;
  const svgWidth = 400;
  const svgHeight = 100;
  const spacing = svgWidth / (colors.length + 1);

  const colorData = colors.map((color, i) => ({
    color,
    cx: spacing * (i + 1),
  }));

  return (
    <Modal background={background} >
      <div className="flex flex-col h-full">
        <p className={`${S.text.modalTextYellow} text-center ${noColorSelected ? 'animate-shake' : ''}`}>Select Your Color</p>

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

        <div className="flex flex-row justify-between gap-4 mt-auto pb-5">
          <Button name={buttons.a.name} callBack={buttons.a.callback} args={buttons.a.args} namedStyles={buttons.a.styles} />
          <Button name={buttons.b.name} callBack={buttons.b.callback} namedStyles={buttons.b.styles} />
        </div>

      </div>
    </Modal>
  );
}

export default ColorPicker;