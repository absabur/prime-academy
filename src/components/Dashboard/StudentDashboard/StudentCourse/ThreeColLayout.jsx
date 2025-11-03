const ThreeColLayout = ({ leftComponent, rightComponent }) => {
  return (
    <div className="flex gap-lg flex-col lg:flex-row items-start">
      <div className="w-full flex-1 lg:flex-2 shadow-md rounded-lg border border-black/10 bg-secondary-bg p-lg">
        {leftComponent}
      </div>
      <div className="w-full flex-1 lg:flex-1 shadow-md rounded-lg border border-black/10 p-lg">
        {rightComponent}
      </div>
    </div>
  );
};

export default ThreeColLayout;
