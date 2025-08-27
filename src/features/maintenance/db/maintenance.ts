export default interface Maintenance {
  maintenanceId?: number; // optional if new
  vehicleId: number;
  oilChange: string;
  tireChange: string;
  brakeChange: string;
  airFilter: string;
  transmissionFluid: string;
  coolantAntifreeze: string;
}
