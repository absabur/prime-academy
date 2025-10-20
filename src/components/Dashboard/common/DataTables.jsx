import PaginationSection from '@/components/common/PaginationSection';
import TableHeading from './TableHeading';
import SecondaryButton from '@/components/common/SecondaryButton';
import DashBroadActionButton from './DashBroadActionButton';

export default function DataTables({ columns, data, paginationType, pageSize, error }) {
  return (
    <div className="overflow-x-auto max-w-[100vw] md:max-w-[calc(100vw_-_350px)] bg-white shadow-around-sm rounded-lg border border-primary/30">
      <table className="min-w-max w-full border-collapse ">
        <thead className="bg-primary/10 text-black/80 ">
          <tr>
            {columns?.map((col) => (
              <TableHeading key={col.key} col={col} />
            ))}
            <th className={`py-md px-xl text-left font-semibold whitespace-nowrap select-none `}>
              Status
            </th>
            <th className={`py-md px-xl text-left font-semibold whitespace-nowrap select-none `}>
              Action
            </th>
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
                  <td key={col.key} className="py-md px-xl text-black/80 whitespace-nowrap">
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}

                <td className="py-md px-xl text-black/80 whitespace-nowrap">
                  <select name="" id="">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </td>

                <td className="py-md px-xl text-black/80 whitespace-nowrap">
                  <div className="flex gap-sm">
                    <DashBroadActionButton type={'edit'} />
                    <DashBroadActionButton type={'delete'} />
                  </div>
                </td>
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
      <PaginationSection
        pagination={paginationType}
        pageSize={pageSize}
        error={error}
        styte={{ padding: 'var(--spacing-lg) 0' }}
      />
    </div>
  );
}
