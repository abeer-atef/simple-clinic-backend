import { RequestHandler } from "express";
import { getDoctorFilteredDataFormat } from "./get-doctor-by-id.dto";
import { Doctor } from "../../../models/doctor.model";
import { ApiHandler } from "../../../interfaces/api-handler";
import { DoctorDetailsResponse } from "./get-doctor-by-id.dto";

 const getDoctorById: ApiHandler<
  {},
  DoctorDetailsResponse,
  {},
  { id: string }
> = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate({
      path: "personId",
      select: "_id name email phoneNumber specialization",
    });

    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
        errors: {
          id: ["No doctor found with the provided ID."],
        },
      });
    }

    return res.status(200).json({
      message: "Doctor retrieved successfully",
      data: getDoctorFilteredDataFormat(doctor),
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while retrieving doctor",
      errors: {
        server: [error instanceof Error ? error.message : "Unknown error"],
      },
    });
  }
};


export { getDoctorById };
