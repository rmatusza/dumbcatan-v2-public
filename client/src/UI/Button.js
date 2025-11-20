import { buildClassName } from "../Functions/utility";

const Button = ({ type, name, callBack, args = [], tailwindStyles = "", CssStyles = {}, namedStyles = [], overwriteBaseStyle = false, passEventObject = false }) => {

  const baseStyle = "px-4 py-2 rounded transition-colors duration-300 w-full";
  const customStyle = tailwindStyles;

  const handleClick = (e) => {
    if (callBack) {
      if(passEventObject) {
        callBack(e, ...args);
      }
      else{
        callBack(...args);
      }
    }
  };

  return (
    <button key={name} type={type} onClick={handleClick} className={buildClassName(baseStyle, customStyle, namedStyles, overwriteBaseStyle)} style={CssStyles}>
      {name}
    </button>
  )
};

export default Button;