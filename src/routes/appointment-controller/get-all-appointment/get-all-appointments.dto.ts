import { Appointment } from "../../../models/appointment.model";

export function getAllAppointmentsResponse(appointment: InstanceType<typeof Appointment>) {
  return {
    id: appointment.id,
    appointmentDate: appointment.appointmentDate,
    status: appointment.appointmentStatus,
    medicalRecord: appointment.medicalRecord,
    medications: appointment.prescription?.medications,
    prescriptionFile: appointment.prescription?.file || null,
  };
}