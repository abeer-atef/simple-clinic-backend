 enum enAppointmentStatus {
  Pending = "Pending",
  Completed = "Completed",
  Canceled = "Canceled",
  Rescheduled = "Rescheduled",
  NoShow = "No Show",
}

interface IMedicalRecord {
  visitDescription?: string;
  diagnosis?: string;
  additionalNotes?: string;
}

interface IMedication {
  name?: string;
  dosage?: string;
  frequency?: string;
  startDate?: Date | string;
  endDate?: Date | string;
  specialInstructions?: string;
}

interface IPrescriptionFile {
  url: string;
  fileType: string;
}

interface IRequestBody {
  appointmentDate?: Date | string;
  appointmentStatus?: string;
  medicalRecord?: string | IMedicalRecord;
  medications?: string | IMedication[];
  file?: IPrescriptionFile;
}

export{IRequestBody,IMedication,enAppointmentStatus}