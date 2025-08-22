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
};

export default employeeService;
