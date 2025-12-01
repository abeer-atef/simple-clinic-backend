import { RequestHandler } from "express";
import { Patient } from "../../../models/patient.model";
import { Doctor } from "../../../models/doctor.model";
import { Appointment } from "../../../models/appointment.model";
import { getAppointmentByUserResponse } from "./get-appointment-by-user.dto";
import { ApiHandler } from "../../../interfaces/api-handler";

type AppointmentResponse = ReturnType<typeof getAppointmentByUserResponse>;

interface IResponse {
  appointments: AppointmentResponse[];
}

let getUserAppointments: ApiHandler<{}, IResponse> = async (req, res) => {
  const patient = await Patient.findOne({ personId: req.user?.id });
  const doctor = await Doctor.findOne({ personId: req.user?.id });
  console.log(doctor);
  if (!patient && !doctor) {
    return res.status(400).json({
      errors: {
        auth: ["You are not authorized. Please login."],
      },
    });
  }
  const appointments = await Appointment.find({
    $or: [{ patientId: patient?._id}, { doctorId: doctor?._id }],
  });
  if (appointments.length === 0) {
    return res.status(404).json({
      errors: {
        email: ["you haven't reserved any appointments."],
      },
    });
  }
  res.status(200).json({
    data: {
      appointments: appointments.map((a) => getAppointmentByUserResponse(a)),
    },
  });
};

export { getUserAppointments };
