import { Appointment } from "../../../models/appointment.model";

export function getAppointmentByUserResponse(
  appointment: InstanceType<typeof Appointment>
) {
  return {
    id: appointment._id.toString(),
    appointmentDate: appointment.appointmentDate,
    status: appointment.appointmentStatus,
    medicalRecord: appointment.medicalRecord,
    medications: appointment.prescription?.medications,
    prescriptionFile: appointment.prescription?.file || null,
  };
}
