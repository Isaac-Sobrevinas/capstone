"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import vehicleService from "@/features/vehicles/api/vehicleService";
import maintenanceService from "@/features/maintenance/api/maintenanceService"; // ⬅️ import maintenance
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NewVehiclePage = () => {
  const [plateNumber, setPlateNumber] = useState("");
  const [model, setModel] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const saveVehicle = async () => {
    try {
      setLoading(true);

      // 1. Create the vehicle
      const newVehicle = await vehicleService.create({ plateNumber, model });

      // 2. Create a blank maintenance record for this vehicle
      await maintenanceService.create({
        vehicleId: newVehicle.vehicleId,
        oilChange: "",
        tireChange: "",
        brakeChange: "",
        airFilter: "",
        transmissionFluid: "",
        coolantAntifreeze: "",
      });

      alert("Vehicle and maintenance record created successfully!");
      router.push(`/vehicles`); // go back to vehicles list
    } catch (error) {
      console.error("Error saving vehicle and maintenance:", error);
      alert("Failed to save vehicle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 bg-gray-100 flex-1">
      <div className="bg-white p-8">
        <Link
          href="/maintenance"
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
          Maintenance Page
        </Link>

        <h1 className="text-2xl font-bold mb-4">Add New Vehicle</h1>

        <div className="flex flex-col gap-4">
          <Input
            value={plateNumber}
            label="Plate Number"
            onChange={(e) => setPlateNumber(e.target.value)}
          />
          <Input
            value={model}
            label="Model"
            onChange={(e) => setModel(e.target.value)}
          />
          <Button className="px-4" onClick={saveVehicle} disabled={loading}>
            {loading ? "Saving..." : "Save Vehicle"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewVehiclePage;
