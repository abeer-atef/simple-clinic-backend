import { deleteAppointmentById } from "./remove-appointment-functions";
import { ApiHandler } from "../../../interfaces/api-handler";

let removeAppointment: ApiHandler<{ id: string }> = async (req, res) => {
  const appointmentId = req.body.id;

  if (!appointmentId) {
    return res.status(400).json({
      errors: {
        id: ["Please provide the appointment id you want to remove."],
      },
    });
  }

  const deletedAppointment = await deleteAppointmentById(appointmentId);

  if (!deletedAppointment) {
    return res.status(404).json({
      errors: {
        id: ["Appointment not found. It may have already been deleted."],
      },
    });
  }

  return res.status(200).json({
    message: "Appointment removed successfully.",
  });
};

export { removeAppointment };
