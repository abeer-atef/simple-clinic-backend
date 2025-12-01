import mongoose, { ObjectId, Schema, Types } from "mongoose";

interface IDoctor {
  personId: ObjectId;
  specialization: string;
}

const doctorSchema = new Schema<IDoctor>({
  personId: {
    type: Types.ObjectId,
    ref: "Person",
  },
  specialization: { type: String, required: true },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

export { Doctor };
