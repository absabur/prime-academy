import PaginationSection from '@/components/common/PaginationSection';
import TableHeading from './TableHeading';
import DashBroadActionButton from './DashBroadActionButton';
import './table.css';

export default function DataTables({
  columns,
  data,
  paginationType,
  pageSize,
  error,
  handelDelete,
  deleteButton = true,
  handleView,
  handelEdit,
  paginationShow = true,
  statusKey = 'is_active',
  statusChange,
  statusShow = true,
}) {
  return (
    <div className="overflow-x-auto bg-white shadow-around-sm rounded-lg border border-primary/30">
      <table className="min-w-max w-full border-collapse ">
        <thead className="bg-primary/10 text-black/80 ">
          <tr>
            {columns?.map((col) => (
              <TableHeading key={col.key} col={col} />
            ))}
            {statusShow && (
              <th className={`py-md px-md text-left font-semibold whitespace-nowrap select-none `}>
                Status
              </th>
            )}
            {(handleView || handelEdit || deleteButton) && (
              <th className={`py-md px-md text-left font-semibold whitespace-nowrap select-none `}>
                Action
              </th>
            )}
          </tr>
        </thead>

        <tbody>
          {data && data.length > 0 ? (
            data.map((row, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 border-b border-black/10 last:border-none transition"
              >
                {columns?.map((col) => (
                  <td key={col.key} className="py-md px-md text-black/80 whitespace-nowrap">
                    {col.render ? col.render(row, col, index) : row[col.key]}
                  </td>
                ))}
                {statusShow && (
                  <td className="py-md px-md text-black/80 whitespace-nowrap">
                    <div
                      className={`relative inline-flex items-center justify-between w-28 px-md py-sm rounded-full border transition-all duration-200 cursor-pointer
                        ${
                          row[statusKey] === 'true' || row[statusKey] === true
                            ? 'bg-green-100 border-green-400 text-green-700'
                            : 'bg-red-100 border-red-400 text-red-700'
                        }`}
                    >
                      <select
                        onChange={(e) => statusChange(row.id, statusKey, e.target.value)}
                        value={row[statusKey]}
                        className="appearance-none bg-transparent w-full font-medium text-sm focus:outline-none cursor-pointer pr-5 tableStatusDropDown"
                      >
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                      </select>
                      <span className="absolute right-2 text-gray-600 pointer-events-none">▼</span>
                    </div>
                  </td>
                )}

                {(handleView || handelEdit || deleteButton) && (
                  <td className="py-md px-md text-black/80 whitespace-nowrap">
                    <div className="flex gap-sm">
                      {handleView && (
                        <DashBroadActionButton
                          type={'view'}
                          onClick={() => handleView(row.id || row.page_name)}
                        />
                      )}
                      {handelEdit && (
                        <DashBroadActionButton
                          type={'edit'}
                          onClick={() => handelEdit(row.id || row.page_name)}
                        />
                      )}
                      {deleteButton && (
                        <DashBroadActionButton
                          onClick={() => handelDelete(row.id || row.page_name)}
                          type={'delete'}
                          id={row.id}
                        />
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns?.length} className="text-center py-5 text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Pagination Section */}
      <div className="w-full sticky left-0">
        {paginationShow && (
          <PaginationSection
            pagination={paginationType}
            pageSize={pageSize}
            error={error}
            styte={{ padding: 'var(--spacing-lg) 0' }}
          />
        )}
      </div>
    </div>
  );
}
