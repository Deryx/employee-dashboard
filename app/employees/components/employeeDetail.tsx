import { Employee } from '@/types/employee';

type EmployeeDetails = {
    employee: Employee;
    onButtonClick: () => void;
};

const EmployeeDetails = ({ employee, onButtonClick }: EmployeeDetails) => {
    return (
        <section>
            <h2>
                <span>Employee Details</span>
                <button
                    onClick={onButtonClick}
                >
                    X
                </button>
            </h2>

            <div>
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
                <div>
                    <div>
                        <label>Email</label>
                        <span>{employee.email}</span>
                    </div>
                    <div>
                        <label>Location</label>
                        <span>{employee.location}</span>
                    </div>
                    <div>
                        <label>Level</label>
                        <span>{employee.level}</span>
                    </div>
                    <div>
                        <label>Salary</label>
                        <span>{employee.salary}</span>
                    </div>
                    <div>
                        <label>Hire Date</label>
                        <span>{employee.hireDate}</span>
                    </div>
                    <div>
                        <label>Performance</label>
                        <span>{employee.performanceScore}</span>
                    </div>
                </div>
                <section>
                    <h3>Skills</h3>
                    {
                        employee.skills.map((skill) => (
                            <button
                                key={skill}
                            >
                                {skill}
                            </button>
                        ))
                    }
                </section>
            </div>
        </section>
    );
};

export default EmployeeDetails;