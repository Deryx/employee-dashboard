import { Employee } from '@/types/employee';

const BASE_URL = (
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
).replace(/\/+$/, '');

const url = `${BASE_URL}/employees`;

interface PaginatedEmployeesResponse {
  data: Employee[];
}

export const getAllEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`A response error occurred: ${response.status}`);
    }

    return (await response.json()) as Employee[];
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`There was error: ${e.message}`); } }  return []; };  export const getEmployeesByPage = async ( page: number, pageSize: number ): Promise<Employee[]> => { try { const response = await fetch( `${url}?_page=${page}&_per_page=${pageSize}`
    );

    if (!response.ok) {
      throw new Error(`A response error occurred: ${response.status}`);
    }

    const data = (await response.json()) as PaginatedEmployeesResponse | Employee[];
    return Array.isArray(data) ? data : data.data;
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw new Error(`There was error: ${e.message}`);
    }
  }

  return [];
};
