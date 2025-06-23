const Button = ({ type, replacementStyle = "", styleAddOns = "", customCSS = null, namedStyles = [], namedStyleAsAddOn = false, name, callBack, args = [] }) => {

  const baseStyle = "px-4 py-2 rounded transition-colors duration-300 w-full";

  const handleClick = () => {
    if (callBack) {
      callBack(...args);
    }
  }

  const buildStyles = () => {
    let customStyle = styleAddOns;

    if (replacementStyle.trim().length > 0) {
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

    if(customStyle.trim().length === 0) {
      return baseStyle;
    }

    return customStyle;
  }

  return (
    <button key={name} type={type} onClick={handleClick} className={buildStyles()} style={customCSS}>
      {name}
    </button>
  )
}

export default Button;