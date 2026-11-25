import { Employee } from '@/types/employee';

type EmployeeDetails = {
    employee: Employee;
    onButtonClick: () => void;
};

const EmployeeDetails = ({ employee, onButtonClick }: EmployeeDetails) => {
    const employeeInitials = employee.name.split(' ').map((n) => n[0]).join('').toUpperCase();

    return (
        <div className="h-full w-full bg-white">
            <div
                className="h-[250px] bg-[#1D2B3B] flex justify-between p-6 text-white"
            >
                <div>
                    <div className="h-[75px] w-[75px] rounded-full bg-[#FF7F01] flex items-center justify-center text-[1.5rem] font-bold">
                        {employeeInitials}
                    </div>
                    <div className="mt-4 text-[1.5rem]">
                        <h2 className="font-bold">{employee.name}</h2>
                    </div>
                    <p className="text-gray-300">{employee.title}</p>
                    <div className="flex gap-2 mt-4">
                        <div className={`py-1 px-4 rounded-[20px] text-[0.75rem] font-bold w-fit ${employee.status === 'Active' ? 'bg-[#D8F7E5] text-[#179765]' : employee.status === 'Inactive' ? 'bg-[#FFE6E3] text-[#D73337]' : 'bg-[#FFF5E6] text-[#B67700]'}`}>
                            <span className="text-[1rem] mr-1">•</span> {employee.status}
                        </div>
                        <div className="pt-[0.4rem] py-1 px-4 border border-[#FFFFFF] rounded-[20px] text-[0.75rem] font-bold w-fit">
                            {employee.level}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-top">
                    <button
                        onClick={onButtonClick}
                        className="text-[1rem] font-bold hover:text-gray-300 align-top"
                    >
                        &#10005;
                    </button>
                </div>
            </div>

            <div className="p-6">
                <div className="mb-3">
                    <div className="mb-2 flex flex-col">
                        <label className="text-[0.8rem] text-gray-500">Department</label>
                        <span className="text-[1rem] font-semibold">{employee.department}</span>
                    </div>
                    <div className="mb-3 flex flex-col">
                        <label className="text-[0.8rem] text-gray-500">Location</label>
                        <span className="text-[1rem] font-semibold">{employee.location}</span>
                    </div>
                    <div className="mb-3 flex flex-col">
                        <label className="text-[0.8rem] text-gray-500">Email</label>
                        <span className="text-[1rem] font-semibold">{employee.email}</span>
                    </div>
                    <div className="mb-3 flex flex-col">
                        <label className="text-[0.8rem] text-gray-500">Hire Date</label>
                        <span className="text-[1rem] font-semibold">{employee.hireDate}</span>
                    </div>
                    <div className="mb-3 flex flex-col">
                        <label className="text-[0.8rem] text-gray-500">Salary</label>
                        <span className="text-[1rem] font-semibold">{employee.salary}</span>
                    </div>
                    <div className="mb-3 flex flex-col">
                        <label className="text-[0.8rem] text-gray-500">Performance</label>
                        <span className="text-[1rem] font-semibold">{employee.performanceScore}</span>
                    </div>
                    <div className="mb-3 flex flex-col">
                        <label className="text-[0.8rem] text-gray-500">Skills</label>
                        <span className="text-[1rem] font-semibold">{employee.skills.join(", ")}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;