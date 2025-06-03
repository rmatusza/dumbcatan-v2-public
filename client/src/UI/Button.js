const Button = ({ type, replacementStyle = "", styleAddOns = "", customCSS = null, namedStyles = [], namedStyleAsAddOn = false, name, callBack, args = [] }) => {

  const baseStyle = "px-4 py-2 rounded transition-colors duration-300 w-full";

  const handleClick = () => {
    if (callBack) {
      callBack(...args);
    }
  }

  const buildStyles = () => {
    let customStyle = styleAddOns;

    if (replacementStyle) {
      return replacementStyle;
    }

    if (namedStyles.length > 0) {
      namedStyles.forEach(style => {
        customStyle += " "+style;
      })
    }    

    if(namedStyleAsAddOn) {
      customStyle += " " + baseStyle;
    }

    return customStyle;
  }

  return (
    <button onClick={handleClick} type={type} className={buildStyles()} style={customCSS}>
      {name}
    </button>
  )
}

export default Button;