"use client";

import { ChangeEvent } from 'react';
import {
    usePathname,
    useRouter,
    useSearchParams
} from 'next/navigation';

import { Department, Status, Level } from '@/types/employee'

type UserOptions = {
    department: Department;
    status: Status;
    level: Level;
    per_page: number;
}

const EmployeeFilters = ({
    department = "All",
    status = "All",
    level = "All",
    per_page = 25
}: UserOptions) => {
    const router = useRouter();
    const options = useSearchParams();
    const pathname = usePathname();

    const handleDepartmentChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(options);
        const value = e.target.value;

        if (value) {
            params.set("department", value);
        } else {
            params.delete("department");
        }

        params.set("_page", "1");
        router.replace(`${pathname}?${params.toString()}`)
    };

    const handleLevelChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(options);
        const value = e.target.value;

        if (value) {
            params.set("level", value);
        } else {
            params.delete("level");
        }

        params.set("_page", "1");
        router.replace(`${pathname}?${params.toString()}`)
    };

    const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(options);
        const value = e.target.value;

        if (value) {
            params.set("status", value);
        } else {
            params.delete("status");
        }

        params.set("_page", "1");
        router.replace(`${pathname}?${params.toString()}`)
    };

    const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(options);
        const value = e.target.value;

        if (value) {
            params.set("_per_page", value);
        } else {
            params.delete("_per_page");
        }

        params.set("_page", "1");
        router.replace(`${pathname}?${params.toString()}`)
    };

    return (
        <fieldset className="flex ml-[10px]">
            <legend></legend>
            <div>
                <select
                    name="department"
                    id="department"
                    value={department}
                    onChange={handleDepartmentChange}
                    className="p-[5px] border-[0.5px] border-gray-300 rounded-[3px] border-b-[none] text-[0.4375rem] bg-[#FFFAF2]"
                >
                    <option key="All" value="All">All Departments</option>
                    <option key="Engineering" value="Engineering">Engineering</option>
                    <option key="Product" value="Product">Product</option>
                    <option key="Design" value="Design">Design</option>
                    <option key="Marketing" value="Marketing">Marketing</option>
                    <option key="Sales" value="Sales">Sales</option>
                    <option key="Finance" value="Finance">Finance</option>
                    <option key="Human Resources" value="Human Resources">Human Resources</option>
                    <option key="Operations" value="Operations">Operations</option>
                    <option key="Customer Success" value="Customer Success">Customer Success</option>
                    <option key="Legal" value="Legal">Legal</option>
                </select>
            </div>
            <div className="ml-[10px]">
                <select
                    name="status"
                    id="status"
                    value={status}
                    onChange={handleStatusChange}
                    className="p-[5px] border-[0.5px] border-gray-300 rounded-[3px] text-[0.4375rem] bg-[#FFFAF2]"
                >
                    <option key="All" value="All">All Statuses</option>
                    <option key="Active" value="Active">Active</option>
                    <option key="Inactive" value="Inactive">Inactive</option>
                    <option key="On Leave" value="On Leave">On Leave</option>
                </select>
            </div>
            <div className="ml-[10px]">
                <select
                    name="level"
                    id="level"
                    value={level}
                    onChange={handleLevelChange}
                    className="p-[5px] border-[0.5px] border-gray-300 rounded-[3px] text-[0.4375rem] bg-[#FFFAF2]"
                >
                    <option key="All" value="All">All Levels</option>
                    <option key="Entry" value="Entry">Entry</option>
                    <option key="Mid" value="Mid">Mid</option>
                    <option key="Senior" value="Senior">Senior</option>
                    <option key="Lead" value="Lead">Lead</option>
                </select>
            </div>
            <div className="ml-[10px]">
                <select
                    id="per_page"
                    name="per_page"
                    value={per_page}
                    onChange={handlePageSizeChange}
                    className="p-[5px] border-[0.5px] border-gray-300 rounded-[3px] text-[0.4375rem] bg-[#FFFAF2]"
                >
                    <option key="All" value="All">Select Per Page</option>
                    <option key="25" value="25">25</option>
                    <option key="50" value="50">50</option>
                    <option key="100" value="100">100</option>
                    <option key="250" value="250">250</option>
                </select>
            </div>
        </fieldset>
    );
};

export default EmployeeFilters;