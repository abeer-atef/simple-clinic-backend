import { Patient } from "../../../models/patient.model";
import { Doctor } from "../../../models/doctor.model";
import { ApiHandler } from "../../../interfaces/api-handler";
import { IRequestBody } from "./add-new-appointment-by-uer";

export const checkDoctorId: ApiHandler<IRequestBody> = async (
  req,
  res,
  next
) => {
  try {
    const { doctorId } = req.body;

    const invalidIds: Record<string, string[]> = {};

    if (!doctorId || doctorId.length !== 24) {
      invalidIds.doctorId = ["Please enter a valid doctor ID"];
    }

    if (Object.keys(invalidIds).length > 0) {
      return res.status(400).json({ errors: invalidIds });
    }
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(400).json({
        errors: {
          doctorId: ["Doctor not found. Please enter a valid doctor ID."],
        },
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};
