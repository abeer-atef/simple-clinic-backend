import { Appointment } from "../../../models/appointment.model";

export function getAppointmentResponse(appointment: InstanceType<typeof Appointment>) {
  return {
    id: appointment._id,
    appointmentDate: appointment.appointmentDate,
    status: appointment.appointmentStatus,
    medicalRecord: appointment.medicalRecord,
    medications: appointment.prescription?.medications,
    prescriptionFile: appointment.prescription?.file || null,
  };
}