import bcrypt from "bcryptjs";
import { Doctor } from "../../../models/doctor.model";
import { Person } from "../../../models/person.model";
import { ApiHandler } from "../../../interfaces/api-handler";
import { UpdateDoctorInfoRequest } from "./update-doctor.dto";


 const updateDoctorInfo: ApiHandler<
  UpdateDoctorInfoRequest
> = async (req, res) => {
  try {
    const {
      id: doctorId,
      name,
      email,
      password,
      dateOfBirth,
      phoneNumber,
      gender,
      address,
      specialization,
    } = req.body;

    if (!doctorId) {
      return res.status(400).json({
   
        errors: {
          id: ["Doctor ID is required."],
        },
      });
    }

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({
        message: "Doctor not found",
        errors: {
          id: ["No doctor found with the provided ID."],
        },
      });
    }

    const person = await Person.findById(doctor.personId);
    if (!person) {
      return res.status(404).json({
        message: "Associated person not found",
        errors: {
          person: ["No person record linked to this doctor."],
        },
      });
    }

    const oldEmail = person.email;

    if (name) person.name = name;
    if (email) person.email = email;
    if (dateOfBirth) person.dateOfBirth = dateOfBirth;
    if (phoneNumber) person.phoneNumber = +phoneNumber;
    if (gender) person.gender = gender;

  
    if (specialization) {
      doctor.specialization = specialization;
      await doctor.save();
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      person.password = hashedPassword;
    }

    await person.save();

    return res.status(200).json({
      message: "Doctor info updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while updating doctor info",
      errors: {
        server: [error instanceof Error ? error.message : "Unknown server error"],
      },
    });
  }
};


export { updateDoctorInfo };
