import Employee from "../db/Employee";
import common from "@/utils/common";

const employeeService = {
  // protected
  getAll: async (isActive: boolean) => {
    const token = localStorage.getItem("token");
    let query = `?isActive=${isActive}`;
    const response = await fetch(`${common.BASE_URL}employees${query}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    const data = await response.json();
    const employees: Employee[] = data.map((item: any) => ({
      employeeId: item.employee_id,
      email: item.email,
      firstName: item.first_name,
      middleName: item.middle_name,
      lastName: item.last_name,
      isActive: item.is_active,
      roleId: item.role_id,
      driversLicense: item.drivers_license,
      createdBy: item.created_by,
      createdDate: item.created_date,
      updatedBy: item.updated_by,
      updatedDate: item.updated_date,
    }));

    return employees;
  },
  getById: async (employeeId: number) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${common.BASE_URL}employees/${employeeId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch employee");
    }
    const data = await response.json();
    const employee: Employee = {
      employeeId: data.employee_id,
      email: data.email,
      firstName: data.first_name,
      middleName: data.middle_name,
      lastName: data.last_name,
      isActive: data.is_active,
      roleId: data.role_id,
      driversLicense: data.drivers_license,
      createdBy: data.created_by,
      createdDate: data.created_date,
      updatedBy: data.updated_by,
      updatedDate: data.updated_date,
    };
    return employee;
  },
  update: async (employee: Employee) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${common.BASE_URL}employees/${employee.employeeId}`, {
      method: "PUT",
      headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(employee),
    });
    if (!response.ok) {
      throw new Error("Failed to fetch employees");
    }
    const data = await response.json();
  }
};

export default employeeService;
