import { capitalizeFirst } from '@/utils/capitalizeFirst';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const PathUrl = () => {
  const location = useLocation();
  const pathParts = location.pathname.split('/').filter(Boolean); // remove empty values

  // Build full paths for each breadcrumb link
  const paths = pathParts.map((part, index) => ({
    name: capitalizeFirst(part.replace(/[-_]/g, ' ')), // ✅ replace - and _
    url: '/' + pathParts.slice(0, index + 1).join('/'),
  }));

  return (
    <div className="flex gap-2 text-white/70 text-sm overflow-x-hidden whitespace-nowrap scrollbar-hide">
      {/* Home always first */}
      {paths.length >= 1 && (
        <Link to="/" className="hover:text-white">
          Home
        </Link>
      )}

      {paths.map((item, index) => (
        <React.Fragment key={item.url}>
          <span>/</span>
          {index === paths.length - 1 ? (
            // Last one not clickable
            <span className="truncate min-w-fit">{item.name}</span>
          ) : (
            <Link className="hover:text-white truncate min-w-fit" to={item.url}>
              {item.name}
            </Link>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default PathUrl;
