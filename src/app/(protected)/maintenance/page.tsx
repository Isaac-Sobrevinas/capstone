"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import maintenanceService from "@/features/maintenance/api/maintenanceService";
import vehicleService from "@/features/vehicles/api/vehicleService";
import Maintenance from "@/features/maintenance/db/maintenance";
import Vehicle from "@/features/vehicles/db/vehicle";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MaintenancePage = () => {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [maintenance, setMaintenance] = useState<Maintenance | null>(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    activate();
  }, []);

  const activate = async () => {
    try {
      const vehicleData = await vehicleService.getById(Number(params.vehicleId));
      setVehicle(vehicleData);

      try {
        const maintenanceData = await maintenanceService.getByVehicleId(
          Number(params.vehicleId)
        );
        setMaintenance(maintenanceData);
      } catch {
        // No maintenance record yet → init empty
        setMaintenance({
          vehicleId: Number(params.vehicleId),
          oilChange: "",
          tireChange: "",
          brakeChange: "",
          airFilter: "",
          transmissionFluid: "",
          coolantAntifreeze: "",
        });
      }
    } catch (error) {
      console.error("Error fetching vehicle or maintenance:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveMaintenance = async () => {
    if (!maintenance) return;
    try {
      setLoading(true);
      if (maintenance.maintenanceId) {
        await maintenanceService.update(maintenance);
      } else {
        await maintenanceService.create(maintenance);
      }
      alert("Maintenance saved successfully!");
    } catch (error) {
      console.error("Error saving maintenance:", error);
      alert("Failed to save maintenance.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 flex-1">
      <div className="bg-white p-8">
        <Link
          href="/vehicles"
          className="text-gray-400 mb-4 flex flex-row w-fit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-left"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Create Vehicle
        </Link>

        <div className="mb-4 flex flex-row justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {vehicle?.plateNumber} – {vehicle?.model}
            </h1>
            <p className="text-gray-500 italic text-sm">
              Vehicle ID: {vehicle?.vehicleId}
            </p>
          </div>
          <Button className="px-4" onClick={saveMaintenance}>
            Save
          </Button>
        </div>

        <h1 className="text-lg font-bold mb-2 text-gray-600">Maintenance</h1>
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="date"
            value={maintenance?.oilChange ?? ""}
            label="Oil Change"
            onChange={(e) =>
              setMaintenance({ ...maintenance!, oilChange: e.target.value })
            }
          />
          <Input
            type="date"
            value={maintenance?.tireChange ?? ""}
            label="Tire Change"
            onChange={(e) =>
              setMaintenance({ ...maintenance!, tireChange: e.target.value })
            }
          />
          <Input
            type="date"
            value={maintenance?.brakeChange ?? ""}
            label="Brake Change"
            onChange={(e) =>
              setMaintenance({ ...maintenance!, brakeChange: e.target.value })
            }
          />
          <Input
            type="date"
            value={maintenance?.airFilter ?? ""}
            label="Air Filter"
            onChange={(e) =>
              setMaintenance({ ...maintenance!, airFilter: e.target.value })
            }
          />
          <Input
            type="date"
            value={maintenance?.transmissionFluid ?? ""}
            label="Transmission Fluid"
            onChange={(e) =>
              setMaintenance({
                ...maintenance!,
                transmissionFluid: e.target.value,
              })
            }
          />
          <Input
            type="date"
            value={maintenance?.coolantAntifreeze ?? ""}
            label="Coolant/Antifreeze"
            onChange={(e) =>
              setMaintenance({
                ...maintenance!,
                coolantAntifreeze: e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MaintenancePage;
