import mongoose, { ObjectId, Schema, Types } from "mongoose";

interface IPatient {
  personId: ObjectId;
}

const patientSchema = new Schema<IPatient>({
  personId: {
    type: Types.ObjectId,
    ref: "Person",
  }});

const Patient = mongoose.model("Patient", patientSchema);

export { Patient };
