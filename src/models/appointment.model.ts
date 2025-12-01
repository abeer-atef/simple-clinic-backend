import mongoose, { ObjectId, Schema, Types } from "mongoose";
import { enAppointmentStatus } from "../routes/appointment-controller/update-appointment/appointment-request";

// Appointment Status:
// 1.Pending: The appointment has been scheduled but has not yet occurred.
//  2.Confirmed: The appointment has been confirmed by both the patient and the healthcare provider.
// 3.Completed: The appointment has taken place as scheduled.
// 4.Canceled: The appointment has been canceled either by the patient or the healthcare provider.
//  5.Rescheduled: The appointment has been rescheduled for a different date or time.
// 6.No Show: The patient did not show up for the appointment without canceling or rescheduling


const medicalRecordSchema = new Schema(
  {
    visitDescription: String,
    diagnosis: String,
    additionalNotes: String,
  },
  { _id: false }
);


export interface IMedicalRecord {
  visitDescription?: string;
  diagnosis?: string;
  additionalNotes?: string;
}

export interface IMedication {
  name?: string;
  dosage?: string;
  frequency?: string;
  startDate?: string;
  endDate?: string;
  specialInstructions?: string;
}

export interface IPrescriptionFile {
  url?: string;
  fileType?: string;
}

export interface IPrescription {
  medications?: IMedication[];
  file?: IPrescriptionFile;
}

export interface IAppointment {
  _id: Types.ObjectId;
  patientId: ObjectId;
  doctorId: ObjectId;
  appointmentDate: Date;
  appointmentStatus: enAppointmentStatus;
  medicalRecord?: IMedicalRecord;
  prescription?: IPrescription;
}

const appointmentSchema = new Schema<IAppointment>({
  patientId: {
    type: Types.ObjectId,
    ref: "patients",
    required: true
  },
  doctorId: { type: mongoose.Types.ObjectId, ref: "doctors", required: true },
  appointmentDate: { type: Date, required: true },
  appointmentStatus: {
    type: String,
    enum: Object.values(enAppointmentStatus),
    default: enAppointmentStatus.Pending,
    require: true,
  },
  medicalRecord: medicalRecordSchema,
  prescription: {
    medications: [
      {
        name:  { type: String },
        dosage:  { type: String },
        frequency:  { type: String},
        startDate:  { type: String},
        endDate:  { type: String },
        specialInstructions:  { type: String},
        _id: false,
      },
    ],
    file: {
      url: { type: String, required: false },
      fileType: { type: String, required: false },
    },
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export { Appointment };
