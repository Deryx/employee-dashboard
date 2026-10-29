export type Employee = {
  id: number;
  employeeId: string;
  name: string;
  email: string;
  department: string;
  title: string;
  level: string;
  location: string;
  status: string;
  salary: number;
  hireDate: string;
  performanceScore: number;
  skills: string[];
};

export type Department =
    "All" |
    "Engineering" |
    "Product" |
    "Design" |
    "Marketing" |
    "Sales" |
    "Finance" |
    "Human Resources" |
    "Operations" |
    "Customer Success" |
    "Legal";

export type Status = "All" | "Active" | "On Leave" |"Inactive";

export type Level = "All" | "Entry" | "Mid" | "Senior" | "Lead";
