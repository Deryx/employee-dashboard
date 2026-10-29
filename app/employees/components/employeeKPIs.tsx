import Card from './card';

import { Employee } from '@/types/employee';

type EmployeeKPIProps = {
    employees: Employee[];
}

const EmployeeKPIs = ({ employees }: EmployeeKPIProps) => {
    let numberEmployees = 0;
    let activeEmployees = 0;
    let inactiveEmployees = 0;
    let onLeaveEmployees = 0;
    let totalPerformance = 0;
    let avgPerformance = 0;

    if (employees && employees.length > 0) {
        numberEmployees = employees.length;
        activeEmployees = employees?.filter((employee) => employee.status === "Active").length;
        onLeaveEmployees = employees?.filter((employee) => employee.status === "On Leave").length;
        inactiveEmployees = employees?.filter((employee) => employee.status === "Inactive").length;

        employees?.forEach((employee) => {
            totalPerformance += employee.performanceScore
        });

        if (numberEmployees > 0) {
            avgPerformance = totalPerformance/numberEmployees;
        }
    }

    return (
        <>
            {employees && employees.length > 0 ?
                (
                    <div className="flex justify-between">
                        <Card title="Employees" info={numberEmployees.toString()} />
                        <Card title="Active" info={activeEmployees.toString()} />
                        <Card title="Inactive" info={inactiveEmployees.toString()} />
                        <Card title="On Leave" info={onLeaveEmployees.toString()} />
                        <Card title="Avg Performance" info={avgPerformance.toFixed(2).toString()} />
                    </div>
                ) : null
            }
            {employees && employees.length === 0 ?
                (
                    <p>No employees found.</p>
                ) : null
            }
        </>
    );
};

export default EmployeeKPIs;