import { ApiHandler } from "../../../interfaces/api-handler";
import { Doctor } from "../../../models/doctor.model";
import { Person } from "../../../models/person.model";
import { Role } from "../../../utils/userRole";
import { IRegisterRequest } from "./add-doctor.dto";
import bcrypt from "bcryptjs"

 const addNewDoctor: ApiHandler<IRegisterRequest> = async (req, res) => {
  const {
    name,
    email,
    dateOfBirth,
    gender,
    phoneNumber,
    password,
    specialization
  } = req.body;

  const missingFields: Record<string, string[]> = {};

  if (!name) missingFields.name = ["Name is required"];
  if (!email) missingFields.email = ["Email is required"];
  if (!dateOfBirth) missingFields.dateOfBirth = ["Date of birth is required"];
  if (!gender) missingFields.gender = ["Gender is required"];
  if (!phoneNumber) missingFields.phoneNumber = ["Phone number is required"];
  if (!password) missingFields.password = ["Password is required"];
  if (!specialization) missingFields.specialization = ["Specialization is required"];

  if (Object.keys(missingFields).length > 0) {
    return res.status(400).json({
      message:"all fields are required",
      errors: missingFields
    });
  }

  const existUser = await Person.findOne({ email });

  if (existUser) {
    return res.status(409).json({
      message: "This email is already registered, please login instead.",
      errors: {
        email: ["Email is already in use"],
      },
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new Person({
    name,
    email,
    dateOfBirth,
    gender,
    phoneNumber,
    isEmailVerified:true,
    password: hashedPassword,
    role: Role.DOCTOR,
  });

  const doctor = new Doctor({
    personId: user._id,
    specialization
  });

  await user.save();
  await doctor.save();

  return res.status(201).json({
    message: "Doctor saved successfully."
  });
};


export { addNewDoctor };
