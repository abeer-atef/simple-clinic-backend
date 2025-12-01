import { Doctor } from "../../../models/doctor.model";


export interface DoctorDetails {
  id: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  specialization: string;
}

export type DoctorDetailsResponse = DoctorDetails;


export function getDoctorFilteredDataFormat(doctor: InstanceType<typeof Doctor>) {
  const person = doctor.personId as {
    name?: string;
    email?: string;
    phoneNumber?: string;
  };
  return {
    id: doctor._id.toString(),
    name: person.name,
    email: person.email,
    phoneNumber: person.phoneNumber,
    specialization: doctor.specialization,
  };
}
