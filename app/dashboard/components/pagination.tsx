'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const PAGE_SIZES = [10, 25, 50, 100];

type PaginationProps = {
    totalItems: number;
    pageSize: number;
    page: number;
};

const Pagination = ({ totalItems, pageSize = 25, page = 1 }: PaginationProps) => {
    const router = useRouter();
    const options = useSearchParams();
    const pathname = usePathname();

    const paginationRef = useRef<HTMLDivElement>(null);

    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

    // Keep the current page visible inside the scroller
    useEffect(() => {
        const active = paginationRef.current?.querySelector<HTMLElement>('[aria-current="page"]');
        if (active && paginationRef.current) {
            const container = paginationRef.current;
            const left = active.offsetLeft - container.clientWidth / 2 + active.clientWidth / 2;
            container.scrollTo({ left, behavior: 'smooth' });
        }
    }, [page, totalPages]);


    const scrollPages = (direction: 1 | -1) => {
        const container = paginationRef.current;
        if (!container) return;
        container.scrollBy({ left: direction * container.clientWidth * 0.8, behavior: 'smooth' });
    };

    const updateParams = (updates: Record<string, string>) => {
        const params = new URLSearchParams(options.toString());
        Object.entries(updates).forEach(([key, value]) => params.set(key, value));
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const handlePreviousClick = () => {
        if (page > 1) updateParams({ _page: String(page - 1) });
    };

    const handleNextClick = () => {
        if (page < totalPages) updateParams({ _page: String(page + 1) });
    };

    const handlePageNumberClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        updateParams({ _page: e.currentTarget.name });
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateParams({ _per_page: e.target.value, _page: '1' });
    };

    const pageArray = Array.from({ length: totalPages }, (_, i) => {
        const pageNumber = i + 1;
        return (
            <button

                key={`page-${pageNumber}`}
                name={String(pageNumber)}
                aria-current={pageNumber === page ? 'page' : undefined}
                className={`shrink-0 border-[none] py-1 px-1 text-[0.5rem] ${
                    pageNumber === page ? 'font-bold underline' : ''
                }`}
                onClick={handlePageNumberClick}
            >
                {pageNumber}
            </button>
        );
    });

    return (
        <nav aria-label="Pagination" className="flex items-center gap-2">
            <button
                className="shrink-0 border-[none] py-1 px-1 text-[0.5rem]"
                disabled={page <= 1}
                onClick={handlePreviousClick}
            >
                Previous
            </button>

            <button
                type="button"
                aria-label="Scroll page numbers left"
                className="shrink-0 border-[none] py-1 px-1 text-[0.75rem]"
                onClick={() => scrollPages(-1)}
            >
                &lt;
            </button>


            <div
                ref={paginationRef}
                className="flex w-40 items-center gap-1 overflow-x-auto scroll-smooth whitespace-nowrap [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
                {pageArray}
            </div>

            <button
                type="button"
                aria-label="Scroll page numbers right"
                className="shrink-0 border-[none] py-1 px-1 text-[0.75rem]"
                onClick={() => scrollPages(1)}
            >
                &gt;
            </button>

            <button
                className="shrink-0 border-[none] py-1 px-1 text-[0.5rem]"
                disabled={page >= totalPages}
                onClick={handleNextClick}
            >
                Next
            </button>

            <label className="shrink-0 text-[0.5rem]">
                Per page{' '}
                <select value={pageSize} onChange={handlePageSizeChange}>
                    {PAGE_SIZES.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}

                </select>
            </label>
        </nav>
    );
};

export default Pagination;