import Maintenance from "../db/maintenance";

const API_URL = "http://localhost:8000/api/maintenance";

const getByVehicleId = async (vehicleId: number): Promise<Maintenance> => {
  const res = await fetch(`${API_URL}/vehicle/${vehicleId}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Maintenance not found");
  return res.json();
};

const create = async (maintenance: Maintenance): Promise<Maintenance> => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(maintenance),
  });
  if (!res.ok) throw new Error("Failed to create maintenance");
  return res.json();
};

const update = async (maintenance: Maintenance): Promise<Maintenance> => {
  if (!maintenance.maintenanceId)
    throw new Error("Maintenance ID required for update");

  const res = await fetch(`${API_URL}/${maintenance.maintenanceId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(maintenance),
  });
  if (!res.ok) throw new Error("Failed to update maintenance");
  return res.json();
};

export default { getByVehicleId, create, update };
