import { RequestHandler } from "express";
import { Patient } from "../../../models/patient.model";
import { Person } from "../../../models/person.model";
import { Appointment } from "../../../models/appointment.model";
import { deleteAppointmentById } from "../../appointment-controller/remove-appointment/remove-appointment-functions";
import { ApiHandler } from "../../../interfaces/api-handler";

 const removePatient: ApiHandler<{id:string}> = async (req, res) => {
  try {
    const patientId = req.body.id;

    if (!patientId) {
      return res.status(400).json({
        message: "Patient ID is required",
        errors: {
          id: ["Please provide the patient ID you want to remove."],
        },
      });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
        errors: {
          id: ["No patient found with the provided ID."],
        },
      });
    }

    const person = await Person.findById(patient.personId);
    if (!person) {
      return res.status(404).json({
        message: "Person linked to patient not found",
        errors: {
          person: ["Associated person record not found."],
        },
      });
    }

    const appointments = await Appointment.find({ patientId: patient._id });

    for (const appt of appointments) {
      const deleted = await deleteAppointmentById(appt._id);
      if (!deleted) {
        return res.status(500).json({
          message: "Failed to delete some appointments",
          errors: {
            appointment: [`Appointment ${appt._id} could not be deleted.`],
          },
        });
      }
    }

    await Person.findByIdAndDelete(patient.personId);
    await Patient.deleteOne({ _id: patient._id });

    return res.status(200).json({
      message: "Patient removed successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while removing patient",
      errors: {
        server: [error instanceof Error ? error.message : "Unknown error"],
      },
    });
  }
};

export { removePatient };
