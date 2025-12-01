import { enGender } from "../../../utils/user-gender";

export interface IRegisterRequest {
  name: string;
  email: string;
  dateOfBirth: string;
  gender: enGender;
  phoneNumber: number;
  password: string;
  specialization: string;
}
