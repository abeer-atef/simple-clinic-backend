import { Appointment } from "../../../models/appointment.model";
import { updateAppointmentResponse } from "./update-appointment.dto";
import { ApiHandler } from "../../../interfaces/api-handler";
import {  enAppointmentStatus, IMedication, IRequestBody } from "./appointment-request";

export const updateAppointment: ApiHandler<IRequestBody, {}, {}, { id: string }> = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    if (!req.body) {
      return res.status(400).json({
        errors: {
          body: ["Missing request body."],
        },
      });
    }

    const targetAppointment = await Appointment.findById(appointmentId);
    if (!targetAppointment) {
      return res.status(400).json({
        errors: {
          id: ["Invalid appointment ID."],
        },
      });
    }

    if (req.body.appointmentDate) {
      const date = new Date(req.body.appointmentDate);
      targetAppointment.appointmentDate = date;
    }

    if (req.body.appointmentStatus) {
      targetAppointment.appointmentStatus = <enAppointmentStatus>req.body.appointmentStatus;
      console.log(targetAppointment.appointmentStatus)
    }

    if (req.body.medicalRecord) {
      try {
        const medicalRecord =
          typeof req.body.medicalRecord === "string"
            ? JSON.parse(req.body.medicalRecord)
            : req.body.medicalRecord;

        targetAppointment.medicalRecord = {
          visitDescription: medicalRecord.visitDescription || "",
          diagnosis: medicalRecord.diagnosis || "",
          additionalNotes: medicalRecord.additionalNotes || "",
        };
      } catch (err) {
        return res.status(400).json({
          errors: {
            medicalRecord: ["Invalid medicalRecord format. Must be valid JSON."],
          },
        });
      }
    }

    if (req.body.medications) {
      let medications: IMedication[];

      medications =
        typeof req.body.medications === "string"
          ? JSON.parse(req.body.medications)
          : req.body.medications;

      if (targetAppointment.prescription?.medications) {
        targetAppointment.set("prescription.medications", medications);
      }
    }

    if (req.file) {
      targetAppointment.prescription!.file = {
        url: `/uploads/${req.file.filename}`,
        fileType: req.file.mimetype,
      };
    }

    await targetAppointment.save();

    return res.status(200).json({
      data: updateAppointmentResponse(targetAppointment),
    });
  } catch (error) {
    return res.status(500).json({
      errors: {
        server: [error instanceof Error ? error.message : "Unexpected server error"],
      },
    });
  }
};
