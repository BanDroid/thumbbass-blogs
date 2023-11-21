import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
} from "@heroicons/react/24/outline";

interface PaginationProps {
  paginateData: {
    currentPage: number;
    totalPage: number;
    pathnameContext?: string;
    sideBtn?: number;
  };
}

export default function Pagination({
  paginateData: { currentPage, totalPage, pathnameContext = "/?", sideBtn = 2 },
}: PaginationProps) {
  const prevBtns = [];
  const nextBtns = [];
  for (let i = 1; i <= sideBtn; i++) {
    if (currentPage - i <= 0) {
      break;
    }
    prevBtns.unshift(currentPage - i);
  }
  for (let i = 1; i <= sideBtn; i++) {
    if (currentPage + i > totalPage) {
      break;
    }
    nextBtns.push(currentPage + i);
  }
  return (
    <>
      <section className="mb-2 flex flex-row items-center justify-center gap-[1px] md:gap-2">
        {currentPage > 1 && totalPage >= 1 && (
          <a
            href={`${pathnameContext}page=${currentPage - 1}`}
            className="btn-primary md-ripples ripples-dark px-4 py-2 rounded-l-lg md:rounded-lg"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </a>
        )}

        {prevBtns.map((page) => (
          <a
            key={page}
            href={`${pathnameContext}page=${page}`}
            className="btn-primary md-ripples ripples-dark px-4 py-2 md:rounded-lg"
          >
            {page}
          </a>
        ))}

        <button
          disabled
          className={`btn-primary md-ripples ripples-dark opacity-50 px-4 py-2 md:rounded-lg
          ${currentPage <= 1 ? "rounded-l-lg" : ""}
          ${currentPage >= totalPage ? "rounded-r-lg" : ""}
        `}
        >
          {currentPage}
        </button>

        {nextBtns.map((page) => (
          <a
            key={page}
            href={`${pathnameContext}page=${page}`}
            className="btn-primary md-ripples ripples-dark px-4 py-2 md:rounded-lg"
          >
            {page}
          </a>
        ))}

        {currentPage !== totalPage && totalPage >= 1 && (
          <a
            href={`${pathnameContext}page=${currentPage + 1}`}
            className="btn-primary md-ripples ripples-dark px-4 py-2 rounded-r-lg md:rounded-lg"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </a>
        )}
      </section>
      <section className="flex flex-row items-center justify-center gap-2">
        {currentPage > 1 && totalPage >= 1 && (
          <a
            href={`${pathnameContext}page=1`}
            className="btn-primary md-ripples ripples-dark px-4 py-2 rounded-lg"
          >
            <ChevronDoubleLeftIcon className="w-6 h-6" />
          </a>
        )}
        {currentPage !== totalPage && totalPage >= 1 && (
          <a
            href={`${pathnameContext}page=${totalPage}`}
            className="btn-primary md-ripples ripples-dark px-4 py-2 rounded-lg"
          >
            <ChevronDoubleRightIcon className="w-6 h-6" />
          </a>
        )}
      </section>
    </>
  );
}
