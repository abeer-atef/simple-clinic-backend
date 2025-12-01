import bcrypt from "bcryptjs";
import { Person } from "../../../models/person.model";
import { Patient } from "../../../models/patient.model";
import { emailService } from "../../../../services/email.service";
import { ApiHandler } from "../../../interfaces/api-handler";
import { UpdatePatientInfoRequest } from "./update-patient.dto";

 const updatePatientInfo: ApiHandler<
  UpdatePatientInfoRequest
> = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        errors: {
          auth: ["Missing or invalid user information , log in please"],
        },
      });
    }

    const person = await Person.findById(userId);
    if (!person) {
      return res.status(404).json({
        message: "Person not found",
        errors: {
          user: ["No person associated with this user ID"],
        },
      });
    }

    const patient = await Patient.findOne({ personId: person._id });
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
        errors: {
          patient: ["No patient data associated with this user"],
        },
      });
    }

    const oldEmail = person.email;

    const fieldsToUpdate: (keyof UpdatePatientInfoRequest)[] = [
      "name",
      "address",
      "dateOfBirth",
      "gender",
      "email",
      "phoneNumber",
    ];

    for (const field of fieldsToUpdate) {
      if (req.body[field] !== undefined) {
        (person as any)[field] = req.body[field];
      }
    }

    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      person.password = hashedPassword;
    }

    if (req.body.email && req.body.email !== oldEmail) {
      await emailService.resetVerification(person, "8h");
    }

    await person.save();

    return res.status(200).json({
      message:
        req.body.email && req.body.email !== oldEmail
          ? "Data updated successfully. Please verify your email."
          : "Data updated successfully.",
      
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update patient info",
      errors: {
        server: [error instanceof Error ? error.message : "Unknown error occurred"],
      },
    });
  }
};


export { updatePatientInfo };
