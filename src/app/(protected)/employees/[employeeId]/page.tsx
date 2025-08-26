"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import employeeService from "@/features/employees/api/employeeService";
import Employee from "@/features/employees/db/Employee";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const EmployeePage = () => {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [fixedName, setFixedName] = useState("");

  const params = useParams();

  useEffect(() => {
    activate();
  }, []);

  const activate = async () => {
    try {
      const employeeData = await employeeService.getById(
        Number(params.employeeId)
      );
      setEmployee(employeeData);
      setFixedName(`${employeeData.firstName} ${employeeData.lastName}`);
    } catch (error) {
      console.error("Error fetching employee:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveEmployee = async () => {
    if (!employee) return;
    try {
      setLoading(true);
      await employeeService.update(employee);
      alert("Employee updated successfully!");
    } catch (error) {
      console.error("Error updating employee:", error);
      alert("Failed to update employee.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="p-8 bg-gray-100 flex-1">
      <div className="bg-white p-8">
        <Link href="/employees" className="text-gray-400 mb-4 flex flex-row w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-chevron-left-icon lucide-chevron-left"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back
        </Link>
        <div className="mb-4 flex flex-row justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{fixedName}</h1>
            <p className="text-gray-500 italic text-sm">ID: {employee?.employeeId}</p>
          </div>
          <Button className="px-4" onClick={saveEmployee}>
            Save
          </Button>
        </div>
        <h1 className="text-lg font-bold mb-2 text-gray-600">Information</h1>
        <div className="flex flex-1 gap-4 w-full mb-3">
          <Input
            value={employee?.firstName}
            label="First Name"
            className="w-full"
            onChange={(e) =>
              setEmployee({ ...employee!, firstName: e.target.value })
            }
          />
          <Input
            value={employee?.middleName}
            label="Middle Name"
            className="w-full"
            onChange={(e) =>
              setEmployee({ ...employee!, middleName: e.target.value })
            }
          />
          <Input
            value={employee?.lastName}
            label="Last Name"
            className="w-full"
            onChange={(e) =>
              setEmployee({ ...employee!, lastName: e.target.value })
            }
          />
        </div>
        <div className="flex flex-row gap-4 w-full">
          <Input
            value={employee?.email}
            readOnly
            label="Email"
            className="mb-3 w-full"
          />
          <Input
            value={employee?.driversLicense ?? ""}
            label="Drivers License"
            className="mb-3 w-full"
            onChange={(e) =>
              setEmployee({ ...employee!, driversLicense: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
