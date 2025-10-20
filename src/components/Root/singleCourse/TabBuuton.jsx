import { FaCheck } from 'react-icons/fa6';

const TabBuuton = ({ button, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`flex justify-between w-full items-center gap-xl py-xl px-lg border-b-5 ${isActive ? 'bg-black/5  border-secondary ' : ' border-transparent'} `}
    >
      <div className="flex justify-start flex-col flex-11/12 ">
        <p
          className={`uppercase text-left pera-sm-bold ${isActive ? 'text-secondary' : 'text-primary'}`}
        >
          {button?.title}
        </p>
        <h3 className="heading-3xl uppercase w-[80%] text-left">{button?.content}</h3>
      </div>
      <div
        className={`flex-1/12 rounded-full  border-2 border-primary w-8 aspect-square flex items-center justify-center ${isActive ? 'bg-primary' : 'bg-white'}`}
      >
        {isActive && <FaCheck className="text-white" />}
      </div>
    </button>
  );
};

export default TabBuuton;
