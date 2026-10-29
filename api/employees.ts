import { Employee } from '@/types/employee';

const url = "http://localhost:3001/employees";

export const getAllEmployees = async(): Promise<Employee[]> => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`A response error occurred: ${ response.status }`);
        }

        return response.json();
    } catch (e: unknown) {
        if (e instanceof Error) {
            throw new Error(`There was error: ${ e.message }`)
        }
    }

    return [];
};

export const getEmployeesByPage = async(page: number, pageSize: number): Promise<Employee[]> => {
    try {
        const response = await fetch(`${url}?_page=${page}&_per_page=${pageSize}`);

        if (!response.ok) {
            throw new Error(`A response error occurred: ${ response.status }`);
        }

        return response.json();
    } catch (e: unknown) {
        if (e instanceof Error) {
            throw new Error(`There was error: ${ e.message }`)
        }
    }

    return [];
}