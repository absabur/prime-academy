import PaginationSection from '@/components/common/PaginationSection';
import TableHeading from './TableHeading';
import DashBroadActionButton from './DashBroadActionButton';
import './table.css';
import { ChevronDown } from 'lucide-react';

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
  from = '',
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
                  <td className="py-3 px-4 whitespace-nowrap text-sm">
                    <div
                      className={`relative inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-medium transition-colors duration-200 ${
                        /* --- Inlined color logic --- */
                        row[statusKey] === 'published' ||
                        row[statusKey] === true ||
                        row[statusKey] === 'true'
                          ? 'bg-green-100 text-green-800 ' // Active/Published
                          : 'bg-red-100 text-red-800 ' // Draft
                      }`}
                    >
                      {/* 1. The Status Dot with inlined color logic */}
                      <span
                        className={`h-2 w-2 rounded-full ${
                          row[statusKey] === 'published' ||
                          row[statusKey] === true ||
                          row[statusKey] === 'true'
                            ? 'bg-green-500' // Active/Published
                            : 'bg-red-500' // Inactive
                        }`}
                      ></span>

                      {/* 2. The Select Element with inlined values/labels */}
                      <select
                        onChange={(e) => statusChange(row.id, statusKey, e.target.value)}
                        value={row[statusKey]}
                        className="appearance-none bg-transparent border-none p-0 focus:outline-none focus:ring-0 pr-5 cursor-pointer text-sm font-medium text-center "
                      >
                        <option value={from === 'blog' ? 'published' : true}>
                          {from === 'blog' ? 'Published' : 'Enable'}
                        </option>
                        <option value={from === 'blog' ? 'draft' : false}>
                          {from === 'blog' ? 'Draft' : 'Disable'}
                        </option>
                      </select>

                      {/* 3. The lucide-react Chevron Icon */}
                      <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronDown size={16} className="opacity-70" />
                      </span>
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
