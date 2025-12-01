import { enGender } from "../../../utils/user-gender";

export interface UpdateDoctorInfoRequest {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  dateOfBirth?: Date;
  phoneNumber?: string;
  gender?: enGender;
  address?: string;
  specialization?: string;
}

