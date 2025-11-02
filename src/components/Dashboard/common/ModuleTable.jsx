import React from 'react';
import { ChevronRight, Play } from 'lucide-react';

const ModuleTable = ({ modules = [], tableColumns = [] }) => {
  // Calculate the total number of grid columns by summing colSpans
  // This is crucial for the dynamic CSS grid
  const totalGridCols = tableColumns.reduce((acc, col) => acc + col.colSpan, 0);

  return (
    <div className="mt-lg">
      {/* --- Modules Section (Dynamic) --- */}
      {modules.map((module) => (
        <div
          key={module.moduleNumber}
          className="mb-lg p-4 bg-white rounded-md shadow-sm border border-black/10"
        >
          <h3 className="text-xl font-semibold text-black mb-4">Module {module.moduleNumber}</h3>
          <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-black/10">
            {/* Table Header (Dynamic) */}
            <div
              className="hidden lg:grid gap-4 px-6 py-4 bg-primary text-white font-medium text-left"
              // Use CSS gridTemplateColumns to set dynamic columns
              style={{
                gridTemplateColumns: `repeat(${totalGridCols}, minmax(0, 1fr))`,
              }}
            >
              {tableColumns.map((col) => (
                <span
                  key={col.header}
                  // Use dynamic col-span and alignment from config
                  className={`lg:col-span-${col.colSpan} ${col.className || ''}`}
                >
                  {col.header}
                </span>
              ))}
            </div>

            {/* Table Rows (Dynamic) */}
            {module.sessions.map((session, sessionIndex) => (
              <div
                key={sessionIndex}
                className={`flex flex-col gap-4 p-4 
                            lg:grid lg:gap-4 lg:items-center lg:px-6 lg:py-4 text-black/80 ${
                              sessionIndex < module.sessions.length - 1
                                ? 'border-b border-black/10'
                                : ''
                            } lg:hover:bg-black/5 transition-colors duration-150`}
                // Apply the same dynamic grid to the rows
                style={{
                  gridTemplateColumns: `repeat(${totalGridCols}, minmax(0, 1fr))`,
                }}
              >
                {/* Map over columns to render cells */}
                {tableColumns.map((col) => {
                  // Render a standard data cell
                  const Icon = col.icon; // Get icon component from config
                  const content = session[col.accessor]; // Get data from session using accessor key

                  return (
                    <div
                      key={col.header}
                      // Use dynamic col-span and CSS class from config
                      className={`lg:col-span-${col.colSpan} flex items-center gap-sm ${
                        col.className || ''
                      }`}
                    >
                      {/* Render icon if provided in config */}
                      {Icon && <Icon className="h-5 w-5 text-secondary flex-shrink-0" />}

                      {/* Render mobile label if provided in config */}
                      {col.mobileLabel && (
                        <span className="font-medium text-black/70 lg:hidden">
                          {col.mobileLabel}
                        </span>
                      )}
                      {content}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ModuleTable;
