import Vehicle from "../db/vehicle";

const API_URL = "http://localhost:8000/api/vehicles";

const getById = async (vehicleId: number): Promise<Vehicle> => {
  const res = await fetch(`${API_URL}/${vehicleId}`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch vehicle");
  return res.json();
};

const getAll = async (): Promise<Vehicle[]> => {
  const res = await fetch(API_URL, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch vehicles");
  return res.json();
};

const create = async (vehicle: { plateNumber: string; model: string }) => {
  const res = await fetch("http://localhost:8000/api/vehicles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehicle),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Failed to create vehicle: ${errorText}`);
  }
  return res.json();
};


export default { getById, getAll, create };
