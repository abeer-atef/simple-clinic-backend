import mongoose, { Schema } from "mongoose";
import { enGender } from "../utils/user-gender";
import { Role } from "../utils/userRole";

interface IPerson {
  name: string;
  dateOfBirth: Date;
  gender: enGender;
  phoneNumber: number;
  email: string;
  password: string;
  role: Role;
  isEmailVerified: boolean;
}

const personSchema = new Schema<IPerson>({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: {
    type: String,
    enum: [enGender.MALE, enGender.FEMALE],
    required: true,
  },
  phoneNumber: { type: Number, require: true },
  email: { type: String, required: true,unique:true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: [Role.PATIENT, Role.DOCTOR],
    required: true,
  },
  isEmailVerified: { type: Boolean, default: false },
});

const Person = mongoose.model("Person", personSchema);

export { Person };
