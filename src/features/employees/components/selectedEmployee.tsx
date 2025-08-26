import Employee from "../db/Employee";

const SelectedEmployee = ({ employee }: { employee: Employee | null }) => {
  if (!employee) {
    return <div>No employee selected</div>;
  }

  return (
    <div>
      <h2>Selected Employee</h2>
      <p>
        {employee.firstName} {employee.lastName}
      </p>
    </div>
  );
};
