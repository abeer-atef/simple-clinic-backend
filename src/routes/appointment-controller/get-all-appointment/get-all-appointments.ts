import { Appointment } from "../../../models/appointment.model";
import { getAllAppointmentsResponse } from "./get-all-appointments.dto";
import { ApiHandler } from "../../../interfaces/api-handler";

type AppointmentResponse = ReturnType<typeof getAllAppointmentsResponse>;

interface IResponse {
  appointments: AppointmentResponse[];
}


let getAllAppointments: ApiHandler<{},IResponse> = async (req, res) => {
  const Appointments = await Appointment.find();
  if (Appointments.length === 0) {
    return res.status(404).json({
      message: "no appointments found",
    });
  }
  return res.json({
    data: {appointments:Appointments.map((a) => getAllAppointmentsResponse(a))},
  });
};

export { getAllAppointments };
