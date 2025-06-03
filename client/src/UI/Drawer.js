import { useRef, useEffect } from "react";

const Drawer = ({ children, drawerOpen, setDrawerOpen, styles }) => {
  const drawerRef = useRef(null);

  const handleClickOutside = (e) => {
    if (drawerRef.current && !drawerRef.current.contains(e.target)) {
      setDrawerOpen(false)
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
      className={styles ? styles(drawerOpen) : `fixed top-0 left-0 h-full w-64 bg-cream shadow-lg z-50 transform transition-transform duration-300) ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
      ref={drawerRef}
    >
      {children}
    </div>
  )
}

export default Drawer;