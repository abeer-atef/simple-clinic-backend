import { Doctor } from "../../../models/doctor.model";
import { ApiHandler } from "../../../interfaces/api-handler";
import { DoctorFilteredDataFormat, GetAllDoctorsResponse } from "./get-all-doctors.dto";

 const getAllDoctors: ApiHandler<{}, GetAllDoctorsResponse> = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate({
      path: "personId",
      select: "_id name email phoneNumber specialization",
    });

    const filteredDoctors = doctors.map((d) => DoctorFilteredDataFormat(d));

    return res.status(200).json({
      message: "Doctors retrieved successfully",
      data: filteredDoctors,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch doctors",
      errors: {
        server: [error instanceof Error ? error.message : "Unknown error"],
      },
    });
  }
};


export { getAllDoctors };
