const OuterSection = ({ children, className = '', style }) => {
  return (
    <section className={`w-full flex items-center justify-center z-40 overflow-hidden ${className}`} style={style}>
      {children}
    </section>
  );
};

export default OuterSection;
