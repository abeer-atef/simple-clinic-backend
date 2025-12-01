import { Doctor } from "../../../models/doctor.model";


export interface DoctorListItem {
  id: string;
  name?: string;
  email?: string;
  phoneNumber?: number;
  specialization: string;
}

export type GetAllDoctorsResponse = DoctorListItem[];


export function DoctorFilteredDataFormat(doctor: InstanceType<typeof Doctor>) {
  const person = doctor.personId as {
    name?: string;
    email?: string;
    phoneNumber?: number;
  };
  return {
    id: doctor._id.toString(),
    name: person.name,
    email: person.email,
    phoneNumber: person.phoneNumber,
    specialization: doctor.specialization,
  };
}
