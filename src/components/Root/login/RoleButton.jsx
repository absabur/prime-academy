export const RoleButton = ({ icon, text, role, setRole, activeRole }) => {
  const handleSetRole = () => {
    setRole(role);
  };
  return (
    <button
      onClick={handleSetRole}
      className={`flex-grow basis-[160px] border border-secondary/25 px-4 py-3 rounded-xl w-full flex flex-col items-center justify-center gap-1 cursor-pointer ${activeRole == role ? 'bg-secondary-light' : ' bg-secondary/15'}`}
    >
      {icon}
      <p className="text-primary-text font-semibold text-xs"> {text}</p>
    </button>
  );
};
