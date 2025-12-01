import mongoose, { ObjectId, Schema, Types } from "mongoose";
import { Role } from "../utils/userRole";
import { enGender } from "../utils/user-gender";

interface IAdmin {
  name: string;
  dateOfBirth: Date;
  gender: enGender;
  phoneNumber: number;
  email: string;
  password: string;
  role: Role;
  isEmailVerified:true
}

const adminSchema = new Schema<IAdmin>({
  name: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: {
    type: String,
    enum: [enGender.MALE, enGender.FEMALE],
    required: true,
  },
  phoneNumber: { type: Number, require: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:{ type: String, required: true,default: Role.ADMIN},
    isEmailVerified: { type: Boolean, default: true }

});

const Admin = mongoose.model("Admin", adminSchema);

export { Admin };
