'use client';

import { useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import EmployeeKPIs from '@/app/employees/components/employeeKPIs';
import SearchInput from '@/app/dashboard/components/searchInput';
import Pagination from '@/app/dashboard/components/pagination';
import EmployeeFilters from '@/app/employees/components/employeeFilters';
import EmployeeTable from '@/app/employees/components/employeeTable';
import { Department, Status, Level, Employee } from '@/types/employee';

import { getAllEmployees } from '@/api/employees';

const HomeContent = () => {
  const searchParams = useSearchParams();

  const query = searchParams.get('q')?.toLowerCase();
  const department = searchParams.get('department');
  const status = searchParams.get('status');
  const level = searchParams.get('level');

  const page = Math.max(1, Number(searchParams.get('_page')) || 1);
  const pageSize = Math.max(1, Number(searchParams.get('_per_page')) || 25);

  const { data, isLoading, error } = useQuery({
    queryKey: ['employees'],
    queryFn: () => getAllEmployees(),
  });

  const employees: Employee[] = useMemo(() => {
    if (Array.isArray(data)) return data;
    if (Array.isArray((data as { data?: unknown } | undefined)?.data)) {
      return (data as unknown as { data: Employee[] }).data;
    }
    if (Array.isArray((data as { items?: unknown } | undefined)?.items)) {
      return (data as unknown as { items: Employee[] }).items;
    }
    return [];
  }, [data]);

  const filteredEmployees = useMemo(() => {
    return employees
      .filter((e) => !query || e.name.toLowerCase().includes(query) || e.email.toLowerCase().includes(query) || e.title.toLowerCase().includes(query))
      .filter((e) => !department || department === 'All' || e.department === department)
      .filter((e) => !status || status === 'All' || e.status === status)
      .filter((e) => !level || level === 'All' || e.level === level);
  }, [employees, query, department, status, level]);

  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const pagedEmployees = useMemo(
    () => filteredEmployees.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filteredEmployees, currentPage, pageSize]
  );

  return (
    <div className="bg-[#FFF5E6] text-[#17324D]">
      <header className="flex justify-between py-[10px]">
        <h2></h2>
      </header>

      <div
        className="flex w-full"
      >
        <aside
          className="w-1/5"
        >
          &nbsp;
        </aside>

        <main
          className="w-4/5 px-[15px]"
        >
          <section className="text-[0.5rem]">
            {isLoading ? <p role="status">Loading employees...</p> : null}

            {error ? <p role="alert">Unable to load employees</p> : null}

            <h3 className="mb-[10px] font-bold text-[0.625rem]">Employee Overview</h3>
            <EmployeeKPIs employees={filteredEmployees} />

            <div className="flex place-items-center p-[10px] border-gray-300 border-[0.5px] mb-[10px] rounded-[3px] mt-[10px] bg-white">
              <SearchInput query={query ?? ''} />
              <EmployeeFilters
                department={(department ?? '') as Department}
                level={(level ?? '') as Level}
                status={(status ?? '') as Status}
                per_page={pageSize}
              />
            </div>

            <EmployeeTable employees={pagedEmployees} />

            <Pagination
              totalItems={filteredEmployees.length}
              page={currentPage}
              pageSize={pageSize}
            />
          </section>
        </main>
      </div>
    </div>
  );
};

const Home = () => (
  <Suspense fallback={<p role="status">Loading dashboard...</p>}>
    <HomeContent />
  </Suspense>
);

export default Home;