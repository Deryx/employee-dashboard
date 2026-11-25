"use client";
"use no memo";

import React, { useRef } from 'react';
import {
    createColumnHelper,
    createSortedRowModel,
    rowSortingFeature,
    sortFn_alphanumeric,
    sortFn_datetime,
    sortFn_text,
    tableFeatures,
    useTable
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';

import EmployeeRow from './employeeRow';
import EmployeeDetail from './employeeDetail';

import { Employee } from '@/types/employee';

type EmployeeTableProps = {
    employees: Employee[] | [];
};

const ROW_HEIGHT = 44;
const COLUMN_COUNT = 11;

const features = tableFeatures({
    rowSortingFeature,
    sortedRowModel: createSortedRowModel(),
    sortFns: {
        alphanumeric: sortFn_alphanumeric,
        datetime: sortFn_datetime,
        text: sortFn_text
    }
});

const columnHelper = createColumnHelper<typeof features, Employee>();

const EmployeeTable = ({ employees }: EmployeeTableProps) => {
    const [selectedEmployee, setSelectedEmployee] = React.useState<Employee | null>(null);
    const [displayedEmployee, setDisplayedEmployee] = React.useState<Employee | null>(null);

    const scrollRef = useRef<HTMLDivElement>(null);

    const columns = React.useMemo(
        () =>
            columnHelper.columns([
                columnHelper.display({
                    id: 'rowNumber',
                    header: '#',
                    cell: ({ row }) => row.getDisplayIndex() + 1
                }),
                columnHelper.accessor('employeeId', {
                    header: 'Employee ID',
                    cell: (info) => info.getValue()
                }),
                columnHelper.accessor('name', { header: 'Name', sortFn: 'text' }),
                columnHelper.accessor('department', { header: 'Department', sortFn: 'text' }),
                columnHelper.accessor('title', { header: 'Job Title', sortFn: 'text' }),
                columnHelper.accessor('level', { header: 'Level' }),
                columnHelper.accessor('location', { header: 'Location', sortFn: 'text' }),
                columnHelper.accessor('status', { header: 'Status', sortFn: 'text' }),
                columnHelper.accessor('salary', { header: 'Salary', sortFn: 'alphanumeric' }),
                columnHelper.accessor('performanceScore', {
                    header: 'Performance Score',
                    sortFn: 'alphanumeric'
                }),
                columnHelper.accessor('hireDate', { header: 'Hire Date', sortFn: 'datetime' })
            ]),
        []
    );

    const table = useTable<typeof features, Employee>(
        {
            debugTable: true,
            features,
            columns,
            data: employees
        },
        (state) => state
    );

    const { rows } = table.getRowModel();

    const rowVirtualizer = useVirtualizer({
        count: rows.length,
        getScrollElement: () => scrollRef.current,
        estimateSize: () => ROW_HEIGHT,
        overscan: 10
    });

    const virtualRows = rowVirtualizer.getVirtualItems();
    const totalSize = rowVirtualizer.getTotalSize();

    const paddingTop = virtualRows.length > 0 ? virtualRows[0].start : 0;
    const paddingBottom =
        virtualRows.length > 0
            ? totalSize - virtualRows[virtualRows.length - 1].end
            : 0;

    const handleRowClick = (employee: Employee) => {
        setSelectedEmployee(employee);
        setDisplayedEmployee(employee);
    };

    const handleCloseDetail = () => setSelectedEmployee(null);

    return (
        <>
            <div ref={scrollRef} className="h-[600px] overflow-auto">
                <table className="w-full">
                    <thead className="sticky top-0 z-10">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id} className="h-6 bg-[#FF7F01] text-[#FFFAF2] text-[1rem] border-[0.5px] rounded-t-[3px]">
                                {headerGroup.headers.map((header) => (
                                    <th key={header.id} className="">
                                        {header.isPlaceholder ? null : (
                                            <div
                                                className={
                                                    header.column.getCanSort() ? 'sortable-header' : ''
                                                }
                                                onClick={header.column.getToggleSortingHandler()}
                                                title={
                                                    header.column.getCanSort()
                                                        ? header.column.getNextSortingOrder() === 'asc'
                                                            ? 'Sort ascending'
                                                            : header.column.getNextSortingOrder() === 'desc'
                                                                ? 'Sort descending'
                                                                : 'Clear sort'
                                                        : undefined
                                                }
                                            >
                                                <table.FlexRender header={header} />
                                                {{
                                                    asc: ' ↑',
                                                    desc: ' ↓',
                                                }[header.column.getIsSorted() as string] ?? null}
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {paddingTop > 0 && (
                            <tr>
                                <td colSpan={COLUMN_COUNT} style={{ height: paddingTop }} />
                            </tr>
                        )}

                        {virtualRows.map((virtualRow) => {
                            const row = rows[virtualRow.index];
                            return (
                                <EmployeeRow
                                    key={row.id}
                                    ref={rowVirtualizer.measureElement}
                                    data-index={virtualRow.index}
                                    employee={row.original}
                                    isSelected={row.original.id === selectedEmployee?.id}
                                    onClick={() => handleRowClick(row.original)}
                                />
                            );
                        })}

                        {paddingBottom > 0 && (
                            <tr>
                                <td colSpan={COLUMN_COUNT} style={{ height: paddingBottom }} />
                            </tr>
                        )}
                    </tbody>
                </table>

            </div>

            <aside
                aria-hidden={!selectedEmployee}
                inert={!selectedEmployee}
                className={`fixed top-0 right-0 z-20 h-full w-[400px] max-w-full bg-white shadow-xl
                    transition-transform duration-300 ease-out
                    ${selectedEmployee ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {displayedEmployee && (
                    <EmployeeDetail employee={displayedEmployee} onButtonClick={handleCloseDetail} />
                )}
            </aside>
        </>
    );
};

export default EmployeeTable;