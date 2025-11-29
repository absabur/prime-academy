const ThreeColLayout = ({ leftComponent, rightComponent }) => {
  return (
    <div className="flex gap-lg flex-col lg:flex-row items-start">
      <div className="w-full flex-1 lg:flex-8">
        {leftComponent}
      </div>
      <div className="w-full flex-1 lg:flex-3">
        {rightComponent}
      </div>
    </div>
  );
};

export default ThreeColLayout;
