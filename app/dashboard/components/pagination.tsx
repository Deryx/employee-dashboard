'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const PAGE_SIZES = [10, 25, 50, 100];

type PaginationProps = {
    totalItems: number;
    pageSize: number;
    page: number;
};

type PageItem = number | 'ellipsis';

const getPaginationItems = (currentPage: number, totalPages: number): PageItem[] => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const items: PageItem[] = [1];
    const leftSibling = Math.max(currentPage - 1, 2);
    const rightSibling = Math.min(currentPage + 1, totalPages - 1);

    if (leftSibling > 2) {
        items.push('ellipsis');
    }

    for (let pageNumber = leftSibling; pageNumber <= rightSibling; pageNumber += 1) {
        items.push(pageNumber);
    }

    if (rightSibling < totalPages - 1) {
        items.push('ellipsis');
    }

    items.push(totalPages);
    return items;
};

const Pagination = ({ totalItems, pageSize = 25, page = 1 }: PaginationProps) => {
    const router = useRouter();
    const options = useSearchParams();
    const pathname = usePathname();

    const safePageSize = Math.max(1, pageSize);
    const totalPages = Math.max(1, Math.ceil(totalItems / safePageSize));
    const currentPage = Math.min(Math.max(1, page), totalPages);

    const updateParams = (updates: Record<string, string>) => {
        const params = new URLSearchParams(options.toString());
        Object.entries(updates).forEach(([key, value]) => params.set(key, value));
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const goToPage = (nextPage: number) => {
        const clampedPage = Math.min(Math.max(1, nextPage), totalPages);
        if (clampedPage !== currentPage) {
            updateParams({ _page: String(clampedPage) });
        }
    };

    const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateParams({ _per_page: e.target.value, _page: '1' });
    };

    const startItem = totalItems === 0 ? 0 : (currentPage - 1) * safePageSize + 1;
    const endItem = totalItems === 0 ? 0 : Math.min(currentPage * safePageSize, totalItems);
    const pageItems = getPaginationItems(currentPage, totalPages);

    return (
        <nav
            aria-label="Pagination"
            className="mt-4 mb-4 flex flex-wrap items-center justify-between gap-3 text-sm text-[#17324D]"
        >
            <div className="flex flex-wrap items-center gap-4">
                <p aria-live="polite">
                    Showing <span className="font-medium">{startItem}</span>-
                    <span className="font-medium">{endItem}</span> of{' '}
                    <span className="font-medium">{totalItems}</span>
                </p>

                <label className="flex items-center gap-2">
                    <span>Rows per page</span>
                    <select
                        value={safePageSize}
                        onChange={handlePageSizeChange}
                        className="rounded-md border border-gray-300 bg-white px-2 py-1"
                    >
                        {PAGE_SIZES.map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </label>
            </div>

            <div className="flex items-center gap-1">
                <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white px-3 py-1.5 font-medium transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={currentPage <= 1}
                    onClick={() => goToPage(currentPage - 1)}
                    aria-label="Go to previous page"
                >
                    Previous
                </button>

                {pageItems.map((item, index) =>
                    item === 'ellipsis' ? (
                        <span
                            key={`ellipsis-${index}`}
                            className="px-2 py-1.5 text-gray-500"
                            aria-hidden="true"
                        >
                            ...
                        </span>
                    ) : (
                        <button
                            key={item}
                            type="button"
                            aria-current={item === currentPage ? 'page' : undefined}
                            className={`min-w-9 rounded-md border px-3 py-1.5 font-medium transition-colors ${
                                item === currentPage
                                    ? 'border-[#E36927] bg-[#E36927] text-white'
                                    : 'border-gray-300 bg-white hover:bg-gray-50'
                            }`}
                            onClick={() => goToPage(item)}
                        >
                            {item}
                        </button>
                    )
                )}

                <button
                    type="button"
                    className="rounded-md border border-gray-300 bg-white px-3 py-1.5 font-medium transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    disabled={currentPage >= totalPages}
                    onClick={() => goToPage(currentPage + 1)}
                    aria-label="Go to next page"
                >
                    Next
                </button>
            </div>
        </nav>
    );
};

export default Pagination;