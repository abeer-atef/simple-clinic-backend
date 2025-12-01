import { Patient } from "../../../models/patient.model";


export interface PatientDetails {
  id: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
}

export type GetPatientByIdResponse = PatientDetails;


export function getPatientFilteredDataFormat(patient: InstanceType<typeof Patient>) {
   const person = patient.personId as {
    name?: string;
    email?: string;
    phoneNumber?: string;
    dateOfBirth?:string
  };
  return {
    id: patient._id.toString(),
    name: person.name,
    email: person.email,
    phoneNumber: person.phoneNumber,
    dateOfBirth: person.dateOfBirth,
  };
}