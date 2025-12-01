import { RequestHandler } from "express";
import { GetPatientByIdResponse, getPatientFilteredDataFormat } from "./get-patient-format.dto";
import { Patient } from "../../../models/patient.model";
import { ApiHandler } from "../../../interfaces/api-handler";

 const getPatientById: ApiHandler<
  {},
  GetPatientByIdResponse,
  {},
  { id: string }
> = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate({
      path: "personId",
      select: "_id name email phoneNumber dateOfBirth",
    });

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
        errors: {
          id: ["No patient found with the provided ID."],
        },
      });
    }

    const formatted = getPatientFilteredDataFormat(patient);

    return res.status(200).json({
      message: "Patient retrieved successfully",
      data: formatted,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while retrieving patient",
      errors: {
        server: [error instanceof Error ? error.message : "Unknown error"],
      },
    });
  }
};


export { getPatientById };
