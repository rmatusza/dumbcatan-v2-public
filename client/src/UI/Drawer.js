import { useRef, useEffect } from "react";
import { buildClassName } from "../Functions/utility";

const Drawer = ({ children, drawerOpen, setDrawerOpen, tailwindStyles = "", CssStyles = {}, namedStyles = [], overwriteBaseStyle = false }) => {
  const drawerRef = useRef(null);
  const baseStyle = "fixed top-0 left-0 h-full w-64 bg-cream shadow-lg z-50 transform transition-transform duration-300";
  const customStyle = tailwindStyles;
  const oldStyle1= "fixed top-0 left-0 h-full w-64 bg-cream shadow-lg z-50 transform transition-transform duration-300)";
  const oldStyle2 = '${drawerOpen ? "translate-x-0" : "-translate-x-full"}';

  const handleClickOutside = (e) => {
    if (!drawerRef.current?.contains(e.target)) {
      setDrawerOpen(false);
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }

  useEffect(() => {
    if (drawerOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
  }, [drawerOpen])

  return (
    <div
      className={`${buildClassName(baseStyle, customStyle, namedStyles, overwriteBaseStyle)} ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      ref={drawerRef}
    >
      {children}
    </div>
  )
}

export default Drawer;