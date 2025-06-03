const GlassCard = ({ children, styles }) => {
  return (
    <div className={styles || `flex flex-col bg-cream/60 backdrop-blur-md rounded-lg shadow-lg p-8`}>
      {children}
    </div>
  );
};

export default GlassCard;