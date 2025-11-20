import { buildClassName } from "../Functions/utility";

const GlassCard = ({ children, tailwindStyles = "", CssStyles = {}, namedStyles = [], overwriteBaseStyle = false}) => {

  const baseStyle = "w-[800px] min-h-[400px] flex flex-col bg-cream/60 backdrop-blur-md rounded-lg shadow-lg p-8";
  let customStyle = tailwindStyles;

  // `flex flex-col bg-cream/60 backdrop-blur-md rounded-lg shadow-lg p-8`

  return (
    <div className={buildClassName(baseStyle, customStyle, namedStyles, overwriteBaseStyle)} style={CssStyles}>
      {children}
    </div>
  );
};

export default GlassCard;