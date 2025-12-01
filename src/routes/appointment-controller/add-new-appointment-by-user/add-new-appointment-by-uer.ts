import { Request, RequestHandler, Response } from "express";
import { Appointment } from "../../../models/appointment.model";
import { ApiHandler } from "../../../interfaces/api-handler";
import { Person } from "../../../models/person.model";
import { Patient } from "../../../models/patient.model";

export interface IRequestBody {
  doctorId: string;
  appointmentDate: Date;
}

export const createAppointmentByUser: ApiHandler<IRequestBody> = async (req, res) => {
  let { doctorId, appointmentDate } = req.body;

  if (!doctorId || !appointmentDate) {
    const errors: Record<string, string[]> = {};

   

    if (!doctorId) {
      errors.doctorId = ["Doctor ID is required"];
    }

    if (!appointmentDate) {
      errors.appointmentDate = ["Appointment date is required"];
    }

    return res.status(400).json({ errors });
  }
  const patient=await Patient.findOne({personId:req.user.id})
  const newAppointment = new Appointment({
    patientId:patient?._id,
    doctorId,
    appointmentDate
  });

  await newAppointment.save();

  return res.status(201).json({
    message: "Appointment created successfully",
  });
};
