import { Employee } from '@/types/employee';

type EmployeeRowProps = {
    employee: Employee;
    ref?: React.Ref<HTMLTableRowElement>;
    'data-index'?: number;
    onClick: () => void;
    isSelected?: boolean;
};

const EmployeeRow = ({
    employee,
    ref,
    'data-index': dataIndex,
    onClick,
    isSelected }: EmployeeRowProps) => {
        const employeeInitials = employee.name.split(' ').map((n) => n[0]).join('').toUpperCase();
        const currencyFormatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        });

        return (
            <tr ref={ref}
                data-index={dataIndex}
                aria-selected={isSelected}
                className={`border-[0.5px] h-16 hover:cursor-pointer hover:bg-[#F4EDE4] border-gray-200 border-l-0 border-r-0 text-[0.8rem] text-gray-500 ${
                    isSelected ? 'bg-[#F4EDE4]' : 'bg-white'
                }`}
                onClick={onClick}
            >
                <td className="px-1 py-1 text-center">{employee.id}</td>
                <td className="px-1 py-1 text-center">{employee.employeeId}</td>
                <td className="px-1 py-1 text-center text-black font-bold text-center">
                    <div className="flex place-items-center">
                        <div className="p-3 mr-2 rounded-full bg-[#FFE9D4] text-center text-[0.75rem] text-[#8D3700]">
                            {employeeInitials}
                        </div>

                        {employee.name}
                    </div>
                </td>
                <td className="px-1 py-1 text-center">{employee.department}</td>
                <td className="px-1 py-1 text-center">{employee.title}</td>
                <td className="px-1 py-1 text-center">
                    <span className="border border-[0.5px] border-gray-300 rounded-[10px] px-2 py-1">
                        {employee.level}
                    </span>
                </td>
                <td className="px-1 py-1 text-center">{employee.location}</td>
                <td className="px-1 py-1 text-center">
                    <div className={`py-1 px-4 rounded-[20px] text-[0.75rem] font-bold w-fit ${employee.status === 'Active' ? 'bg-[#D8F7E5] text-[#179765]' : employee.status === 'Inactive' ? 'bg-[#FFE6E3] text-[#D73337]' : 'bg-[#FFF5E6] text-[#B67700]'}`}>
                        <span className="text-[1rem] mr-1">•</span> {employee.status}
                    </div>
                </td>
                <td className="px-1 py-1 text-right">{currencyFormatter.format(employee.salary)}</td>
                <td className="px-1 py-1 text-right">{employee.performanceScore}</td>
                <td className="px-1 py-1 text-center">{employee.hireDate}</td>
            </tr>
        );
};

export default EmployeeRow;