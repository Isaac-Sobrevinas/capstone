"use client";

import SearchBar from "@/components/searchBar";
import { Button } from "@/components/ui/button";
import employeeService from "@/features/employees/api/employeeService";
import Employee from "@/features/employees/db/Employee";
import common from "@/utils/common";
import { useEffect, useState } from "react";

interface EmployeeData extends Employee {
  isSelected?: boolean;
}

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState<EmployeeData[]>(
    []
  );

  const activate = async () => {
    const employees = await employeeService.getAll(true);
    setEmployees(employees);
    setFilteredEmployees(employees);
    console.log(employees);
  };

  useEffect(() => {
    activate();
  }, []);

  const onSearch = (query: string) => {
    const filtered = employees.filter((employee) =>
      (employee.firstName + " " + employee.lastName)
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  const onSelectAllToggle = (checked: boolean) => {
    setSelectAll(checked);
    setFilteredEmployees((prev) =>
      prev.map((emp) => ({ ...emp, isSelected: checked }))
    );
  };
  
  const changeEmployee = (employee: EmployeeData) => {
    console.log("Selected employee:", employee.firstName);
  }

  return (
    <div className="flex-1">
      <div className="text-xs text-gray-400 bg-amber-200 px-4 py-2">
        Employees
      </div>

      <h1 className="text-2xl font-semibold py-2 px-4">Employees</h1>

      <div className="flex justify-end items-end w-full px-4 py-2">
        <div className="w-1/5">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>

      <div className="px-4 py-2">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-start text-gray-500 text-sm">
              <th className="text-start p-2">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={(e) => onSelectAllToggle(e.target.checked)}
                />
              </th>
              <th className="text-start p-2">Name</th>
              <th className="text-start p-2">Email</th>
              <th className="text-start p-2">Role</th>
            </tr>
          </thead>
          <tbody className="h-full flex-1">
            {filteredEmployees.map((employee) => (
              <tr
                key={employee.employeeId}
                className={`border-b border-gray-100 py-4 hover:bg-gray-50 cursor-pointer ${employee.isSelected ? "bg-gray-50" : ""}`}
                onClick={() => changeEmployee(employee)}
              >
                <td className="p-2">
                  <input
                    type="checkbox"
                    checked={employee.isSelected || false}
                    onChange={() => {
                      setFilteredEmployees((prev) => {
                        const newList = prev.map((emp) =>
                          emp.employeeId === employee.employeeId
                            ? { ...emp, isSelected: !emp.isSelected }
                            : emp
                        );
                        const allSelected = newList.every(
                          (emp) => emp.isSelected
                        );
                        setSelectAll(allSelected);
                        return newList;
                      });
                    }}
                  />
                </td>
                <td className="p-2 font-semibold">
                  {employee.firstName + " " + employee.lastName}
                </td>
                <td className="p-2">{employee.email}</td>
                <td className="p-2">{common.getRole(employee.roleId)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesPage;
