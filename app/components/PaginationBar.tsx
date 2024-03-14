import { Link, useSearchParams } from "@remix-run/react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "~/lib/misc";
import { setSearchParamsString } from "~/routes/sermons";

export const PaginationBar = ({ totalCount }: {totalCount: number}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const $pageNumber = Number(searchParams.get("pageNumber")) || 10;
  const $top = Number(searchParams.get("top")) || 10;
  const totalPages = Math.ceil(totalCount / $top);
  const currentPage = $pageNumber
  const maxPages = 7;
  const halfMaxPages = Math.floor(maxPages / 2);
  const canPageBackwards = $pageNumber > 0;
  const canPageForwards = $pageNumber + $top < totalCount;
  const pageNumbers = [] as Array<number>;
  if (totalPages <= maxPages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    let startPage = currentPage - halfMaxPages;
    let endPage = currentPage + halfMaxPages;
    if (startPage < 1) {
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }
    if (endPage > totalPages) {
      startPage -= endPage - totalPages;
      endPage = totalPages;
    }
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
  }

	console.log({pageNumbers, totalPages, currentPage})
  return (
    <div className="flex items-center gap-1">
      <Link
        to={{
          search: `?pageNumber=${1}&top=${$top}`,
        }}
        preventScrollReset
        prefetch="intent"
        className={cn(
          !canPageBackwards && "pointer-events-none opacity-50",
          "text-neutral-600"
        )}
      >
        <span className="sr-only"> First page</span>
        <ChevronsLeft />
      </Link>
      <Link
        to={{
          search: `?pageNumber=${Math.max($pageNumber - 1, 1)}&top=${$top}`,
        }}
        preventScrollReset
        prefetch="intent"
        className="text-neutral-600"
      >
        <span className="sr-only"> Previous page</span>
        <ChevronLeft />
      </Link>
      {pageNumbers.map((pageNumber) => {
        const isCurrentPage = pageNumber === currentPage;

        if (isCurrentPage) {
          return (
            <div
              key={`${pageNumber}-active`}
              className="grid min-w-[2rem] place-items-center bg-green-dark text-sm text-black"
            >
              <span className="sr-only">Page {pageNumber}</span>
              <span>{pageNumber}</span>
            </div>
          );
        } else {
          return (
            <Link
              key={pageNumber}
              to={{
                search: `?pageNumber=${pageNumber}&top=${$top}`,
              }}
              preventScrollReset
              prefetch="intent"
              className="min-w-[2rem] font-normal text-neutral-600"
            >
              {pageNumber}
            </Link>
          );
        }
      })}
      <Link
        to={{
          search: `?pageNumber=${Math.min(
            $pageNumber + 1,
            totalPages
          )}&top=${$top}`,
        }}
        preventScrollReset
        prefetch="intent"
        className="text-neutral-600"
      >
        <span className="sr-only"> Next page</span>
        <ChevronRight />
      </Link>

      <Link
        to={{
          search: `?pageNumber=${totalPages}&top=${$top}`,
        }}
        preventScrollReset
        prefetch="intent"
        className="text-neutral-600"
      >
        <span className="sr-only"> Last page</span>
        <ChevronsRight />
      </Link>
    </div>
  );
};
