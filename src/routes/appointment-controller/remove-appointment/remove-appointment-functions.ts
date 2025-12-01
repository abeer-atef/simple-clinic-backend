import { Appointment } from "../../../models/appointment.model";
import fs from "fs/promises"

export async function deleteAppointmentById(appointmentId: any) {
  const appointment = await Appointment.findById(appointmentId);

  if (!appointment) return null;

  const fileUrl = appointment.prescription?.file?.url;
  if (fileUrl) {
    try {
      await fs.unlink(`public${fileUrl}`);
      const deletedAppointment = await Appointment.findByIdAndDelete(
        appointmentId
      );

      console.log("File deleted:", fileUrl);
      return deletedAppointment;
    } catch (err) {
      console.warn("Failed to delete file:", err);
      return null;
    }
  }
  const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
  return deletedAppointment
}
