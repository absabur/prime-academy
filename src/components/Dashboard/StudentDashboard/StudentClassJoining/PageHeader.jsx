const PageHeader = ({ courseTitle, batchName }) => (
  <header className="flex flex-col lg:flex-row justify-between sm:items-start gap-lg mb-md">
    <div className="flex gap-md flex flex-col lg:flex-row items-start">
      {courseTitle && (
        <>
          <h1 className="flex text-2xl font-bold text-black">
            {courseTitle}
          </h1>
          {batchName && batchName !== 'N/A' && (
            <div className="items-center flex gap-xs mt-2 md:mt-0">
              <span className="text-xs font-medium px-md py-xs rounded-sm border border-secondary">
                {batchName}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  </header>
);

export default PageHeader;
