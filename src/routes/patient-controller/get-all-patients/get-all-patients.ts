import { Patient } from "../../../models/patient.model";
import { GetAllPatientsResponse, patientFilteredDataFormat, PatientListItem } from "./get-all-patients-format.dto";
import { ApiHandler } from "../../../interfaces/api-handler";

 const getAllPatients: ApiHandler<{}, GetAllPatientsResponse> = async (req, res) => {
  try {
    const patients = await Patient.find().populate({
      path: "personId",
      select: "_id name email phoneNumber dateOfBirth",
    });

    const filteredPatients: PatientListItem[] = patients.map((p) =>
      patientFilteredDataFormat(p)
    );

    return res.status(200).json({
      message: "Patients fetched successfully",
      data: filteredPatients,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch patients",
      errors: {
        server: [error instanceof Error ? error.message : "Unexpected error"],
      },
    });
  }
};


export { getAllPatients };
