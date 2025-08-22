interface Employee {
  employeeId?: string;
  email?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  isActive?: boolean;
  roleId?: number;
  driversLicense?: string;
  createdBy?: string;
  createdDate?: Date;
  updatedBy?: string;
  updatedDate?: Date;
}

export default Employee;
