import { RequestHandler } from "express";
import { Doctor } from "../../../models/doctor.model";
import { Person } from "../../../models/person.model";
import { Appointment } from "../../../models/appointment.model";

import { ApiHandler } from "../../../interfaces/api-handler";
import { RemoveDoctorRequest } from "./remove-doctor.dto";

 const removeDoctor: ApiHandler<RemoveDoctorRequest> = async (req, res) => {
  try {
    const doctorId = req.body.id;

    if (!doctorId) {
      return res.status(400).json({
        errors: {
          id: ["Doctor ID is required"],
        },
      });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({

        errors: {
          id: ["Doctor not found"],
        },
      });
    }

    const doctorDataInPersonDb = await Person.findById(doctor.personId);
    if (!doctorDataInPersonDb) {
      return res.status(404).json({
        message: "Associated person record not found",
        errors: {
          person: ["Doctor's linked person record was not found."],
        },
      });
    }

    const appointments = await Appointment.find({ doctorId });

    const hasFutureAppointments = appointments.some((appointment) =>
      new Date(appointment.appointmentDate).getTime() > Date.now()
    );

    if (hasFutureAppointments) {
      return res.status(400).json({
        message: "Doctor has future appointments",
        errors: {
          appointments: [
            "This doctor has future appointments. Please cancel or reassign them before removal.",
          ],
        },
      });
    }

    const deletedPerson = await Person.findByIdAndDelete(doctor.personId);
    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);

    if (!deletedDoctor || !deletedPerson) {
      return res.status(500).json({
        message: "Failed to delete doctor records",
        errors: {
          delete: ["Doctor or person record could not be deleted."],
        },
      });
    }

    return res.status(200).json({
      message: "Doctor removed successfully"
    });
  } catch (error) {
    console.error("Error removing doctor:", error);
    return res.status(500).json({
      message: "An unexpected error occurred while removing the doctor",
      errors: {
        server: [error instanceof Error ? error.message : "Unknown error"],
      },
    });
  }
};


export { removeDoctor };
