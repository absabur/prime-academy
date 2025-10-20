const InnerSection = ({ Tag = "div", children, className = '', style }) => {
  return (
    <Tag
      className={`w-max-w px-[20px] md:px-[30px] lg:px-[60px] py-15 overflow-x-hidden ${className}`}
      style={style}
    >
      {children}
    </Tag>
  );
};

export default InnerSection;
