import { ChevronDown, Filter } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PrimaryButton from '../../common/PrimaryButton';
import SecondaryButton from '../../common/SecondaryButton';

/**
 * --- Filter Data Structure ---
 * fields = [
 *   { name: 'status', type: 'select', label: 'Status', options: ['All', 'Active', 'Inactive'] },
 *   { name: 'date_joined', type: 'date', label: 'Joined Date' },
 *   { name: 'name', type: 'text', label: 'Full Name' },
 * ]
 */

const TableFilter = ({ fields = [] }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  // ✅ Initial filter state sync from URL or default
  const [filterState, setFilterState] = useState(() => {
    const params = Object.fromEntries(searchParams);
    const initialState = {};

    fields.forEach((field) => {
      initialState[field.name] = params[field.name] || (field.type === 'select' ? 'all' : '');
    });

    return initialState;
  });

  // ✅ Handle input changes
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (name === 'search') {
        setSearchParams({ ...Object.fromEntries(searchParams), [name]: value, page: 1 });
      }
      setFilterState((prev) => ({ ...prev, [name]: value }));
    },
    [setSearchParams]
  );

  // ✅ Handle Submit (apply filters)
  const handleSubmit = (e) => {
    e.preventDefault();
    const activeFilters = {};

    Object.entries(filterState).forEach(([key, value]) => {
      if (value && value !== 'all') activeFilters[key] = value;
    });

    setSearchParams({ ...activeFilters, page: 1 });
  };

  // ✅ Reset handler
  const handleReset = useCallback(() => {
    const resetState = {};
    fields.forEach((field) => {
      resetState[field.name] = field.type === 'select' ? 'all' : '';
    });
    setFilterState(resetState);
    setSearchParams({});
  }, [fields, setSearchParams]);

  // ✅ Render Input Fields
  const filterFields = useMemo(() => {
    return fields.map((field) => {
      const { name, type, label, placeholder, options = [] } = field;
      const value = filterState[name] || '';

      const commonClass =
        'w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary transition duration-150';

      let inputElement;
      switch (type) {
        case 'text':
          inputElement = (
            <input
              type="text"
              id={name}
              name={name}
              value={value}
              onChange={handleChange}
              placeholder={placeholder || `Enter ${label}`}
              className={commonClass}
            />
          );
          break;

        case 'date':
          inputElement = (
            <input
              type="date"
              id={name}
              name={name}
              value={value}
              onChange={handleChange}
              className={commonClass}
            />
          );
          break;

        case 'select':
          inputElement = (
            <div className="relative">
              <select
                id={name}
                name={name}
                value={value}
                onChange={handleChange}
                className={`${commonClass} appearance-none pr-8 cursor-pointer`}
              >
                {/* Default All Option */}
                {!options.includes('All') && <option value="all">All</option>}
                {options.map((opt, index) => (
                  <option key={index} value={opt.value}>
                    {opt.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          );
          break;

        default:
          inputElement = null;
      }

      return (
        <div key={name} className="flex flex-col space-y-1">
          <label htmlFor={name} className="text-sm font-medium text-gray-700">
            {label}
          </label>
          {inputElement}
        </div>
      );
    });
  }, [fields, handleChange, filterState]);

  const visibleFields = isCollapsed ? filterFields.slice(0, 3) : filterFields;
  const hasMoreFields = filterFields.length > 3;

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100 mb-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center">
          <Filter className="w-5 h-5 mr-2 text-primary" />
          Data Filters
        </h2>

        {/* Collapse Toggle */}
        {hasMoreFields && (
          <button
            type="button"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center text-sm font-medium text-primary hover:text-secondary transition duration-150"
          >
            {isCollapsed ? 'Show More Filters' : 'Show Less Filters'}
            <ChevronDown
              className={`w-4 h-4 ml-1 transform transition-transform duration-300 ${
                isCollapsed ? '' : 'rotate-180'
              }`}
            />
          </button>
        )}
      </div>

      {/* Filter Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-4">
        {visibleFields}
      </div>

      {/* Buttons */}
      <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3">
        <PrimaryButton type="submit" text="Search" />
        <SecondaryButton
          type="button"
          onClick={handleReset}
          text="Reset"
          className="text-primary border-2 border-primary hover:bg-secondary hover:border-secondary hover:text-white"
        />
      </div>
    </form>
  );
};

export default TableFilter;
