import { Employee } from '@/types/employee';

type EmployeeDetails = {
    employee: Employee;
    onButtonClick: () => void;
};

const EmployeeDetails = ({ employee, onButtonClick }: EmployeeDetails) => {
    return (
        <section className="fixed top-0 right-0 w-[200px] text-[0.4375rem] h-full bg-white shadow-lg p-2 z-50 border-l-[2px] border-[#FF7F01] overflow-y-auto">
            <h2
                className="w-full flex justify-between items-center font-bold mb-2 pb-2"
            >
                <span>Employee Details</span>
                <button
                    onClick={onButtonClick}
                >
                    &#10006;
                </button>
            </h2>

            <div
                className="flex justify-between items-center mb-4 pb-2 bg-[#FF7F01] text-[#FFFAF2] rounded-[3px] p-2"
            >
                <div>
                    <p>{employee.name}</p>
                    <p>{employee.employeeId}</p>
                </div>
                <div>
                    <p>{employee.title}</p>
                    <p>{employee.department}</p>
                </div>
            </div>

            <div>
                <div className="mb-2 pb-2">
                    <div className="mb-1">
                        <label className="font-bold">Email: </label>
                        <span>{employee.email}</span>
                    </div>
                    <div className="mb-1">
                        <label className="font-bold">Location: </label>
                        <span>{employee.location}</span>
                    </div>
                    <div className="mb-1">
                        <label className="font-bold">Level: </label>
                        <span>{employee.level}</span>
                    </div>
                    <div className="mb-1">
                        <label className="font-bold">Salary: </label>
                        <span>{employee.salary}</span>
                    </div>
                    <div className="mb-1">
                        <label className="font-bold">Hire Date: </label>
                        <span>{employee.hireDate}</span>
                    </div>
                    <div className="mb-1">
                        <label className="font-bold">Performance: </label>
                        <span>{employee.performanceScore}</span>
                    </div>
                </div>
                <section>
                    <>
                        <h3 className="font-bold">Skills</h3>
                        <div
                            className="flex flex-wrap gap-2 mt-2"
                        >
                            {
                                employee.skills.map((skill) => (
                                    <button
                                        key={skill}
                                        className="bg-[#FF7F01] mt-[-5px] text-white border hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-[10px] text-[0.375rem]"
                                    >
                                        {skill}
                                    </button>
                                ))
                            }
                        </div>
                    </>
                </section>
            </div>
        </section>
    );
};

export default EmployeeDetails;