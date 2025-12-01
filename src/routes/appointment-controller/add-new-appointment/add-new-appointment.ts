import { Request, RequestHandler, Response } from "express";
import { Appointment } from "../../../models/appointment.model";
import { ApiHandler } from "../../../interfaces/api-handler";

interface IRequestBody {
  patientId: string;
  doctorId: string;
  appointmentDate: Date;
}

export const createAppointment: ApiHandler<IRequestBody> = async (req, res) => {
  let { patientId, doctorId, appointmentDate } = req.body;

  if (!patientId || !doctorId || !appointmentDate) {
    const errors: Record<string, string[]> = {};

    if (!patientId) {
      errors.patientId = ["Patient ID is required"];
    }

    if (!doctorId) {
      errors.doctorId = ["Doctor ID is required"];
    }

    if (!appointmentDate) {
      errors.appointmentDate = ["Appointment date is required"];
    }

    return res.status(400).json({ errors });
  }

  const newAppointment = new Appointment(req.body);

  await newAppointment.save();

  return res.status(201).json({
    message: "Appointment created successfully",
  });
};
