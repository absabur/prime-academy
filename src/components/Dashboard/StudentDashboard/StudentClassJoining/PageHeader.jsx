import PrimaryButton from '../../../common/PrimaryButton';

const PageHeader = () => (
  <header className="flex flex-col lg:flex-row justify-between sm:items-start gap-lg mb-md">
    <div className="flex gap-md flex flex-col lg:flex-row items-start">
      <h1 className="flex text-2xl font-bold text-black">
        AI Agent Development Bootcamp for Programmers
      </h1>
      <div className="items-center flex gap-xs mt-2 md:mt-0">
        <span className="bg-secondary text-white text-xs font-medium px-md py-xs rounded-sm">
          Module 5
        </span>
        <span className="text-xs font-medium px-md py-xs rounded-sm border border-secondary">
          Batch 4
        </span>
      </div>
    </div>
    <PrimaryButton className="w-full lg:w-fit" text={`Class Routine`} />
  </header>
);

export default PageHeader;
