import { Employee } from '@/types/employee';

type EmployeeRowProps = {
    employee: Employee;
    ref?: React.Ref<HTMLTableRowElement>;
    'data-index'?: number;
};

const EmployeeRow = ({ employee, ref, 'data-index': dataIndex }: EmployeeRowProps) => (
    <tr ref={ref} data-index={dataIndex} className="border-[0.5px] border-gray-300 border-l-0 border-r-0 text-[0.375rem] text-gray-600 bg-white">
        <td className="px-1 py-1 text-center">{employee.id}</td>
        <td className="px-1 py-1 text-center">{employee.employeeId}</td>
        <td className="px-1 py-1 text-center text-black font-bold">{employee.name}</td>
        <td className="px-1 py-1 text-center">{employee.department}</td>
        <td className="px-1 py-1 text-center">{employee.title}</td>
        <td className="px-1 py-1 text-center">{employee.level}</td>
        <td className="px-1 py-1 text-center">{employee.location}</td>
        <td className="px-1 py-1 text-center">{employee.status}</td>
        <td className="px-1 py-1 text-right">{employee.salary}</td>
        <td className="px-1 py-1 text-right">{employee.performanceScore}</td>
        <td className="px-1 py-1 text-center">{employee.hireDate}</td>
    </tr>
);

export default EmployeeRow;