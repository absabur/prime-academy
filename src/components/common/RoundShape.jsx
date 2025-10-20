const RoundShape = ({ p, style, opacity }) => {
  return (
    <div
      style={style}
      className={`absolute ${p == 'right' ? 'right-[-300px]' : 'left-[-300px]'}  ${
        opacity
          ? 'bg-gradient-to-t from-secondary-light/40 to-secondary/40'
          : 'bg-gradient-to-t from-secondary-light to-secondary'
      } top-1/2 -translate-y-1/2 transform absolute h-full max-h-[500px] w-[500px] rounded-full -z-10 hidden lg:block`}
    ></div>
  );
};

export default RoundShape;
