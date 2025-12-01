import { Role } from "../utils/userRole";

export interface IUserToken {
  id: string;
  email: string;
  role: Role;
}
