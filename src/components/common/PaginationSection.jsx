import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import OuterSection from './OuterSection';
import InnerSection from './InnerSection';

const PaginationSection = ({ pagination, pageSize, error, styte = {} }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // 🧠 Get current page from query (default = 1)
  useEffect(() => {
    const pageFromQuery = Number(searchParams.get('page')) || 1; 
    setCurrentPage(pageFromQuery);
  }, [searchParams]);

  // page not found , move to page 1
  useEffect(() => {
    if (error?.message == 'Invalid page.') {
      setCurrentPage(1);

      // Update query param
      setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: 1 });
    }
  }, [error]);

  // 🧠 Calculate total pages from backend count
  useEffect(() => {
    if (pagination?.count) {
      setTotalPages(Math.ceil(pagination.count / pageSize));
    }
  }, [pagination]);

  // ⚡ Go to a specific page
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Update query param
      setSearchParams({ ...Object.fromEntries(searchParams.entries()), page });
    }
  };

  // 🧮 Generate dynamic pagination numbers
  const getPages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <OuterSection>
      <InnerSection style={styte} className="flex justify-center pt-0">
        <Pagination>
          <PaginationContent className="flex items-center gap-2 flex-wrap">
            {/* Previous */}
            <PaginationItem className="ml-auto">
              <Button
                variant="default"
                size="icon"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="mr-1 w-8 h-8 rounded-lg bg-black text-white hover:bg-black/90 disabled:opacity-50"
              >
                <FaArrowLeft size={14} />
              </Button>
            </PaginationItem>

            {/* Pages */}
            {getPages().map((page, index) =>
              page === '...' ? (
                <PaginationItem className="ml-auto" key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              ) : (
                <PaginationItem className="ml-auto" key={index}>
                  <PaginationLink
                    onClick={(e) => {
                      e.preventDefault();
                      goToPage(page);
                    }}
                    className={`h-8 w-8 rounded-full text-sm font-medium cursor-pointer transition-colors ${
                      page === currentPage ? 'bg-black text-white hover:text-black' : ''
                    }`}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}

            {/* Next */}
            <PaginationItem className="ml-auto">
              <Button
                variant="default"
                size="icon"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-1 w-8 h-8 rounded-lg bg-black text-white hover:bg-black/90 disabled:opacity-50"
              >
                <FaArrowRight size={14} />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </InnerSection>
    </OuterSection>
  );
};

export default PaginationSection;
