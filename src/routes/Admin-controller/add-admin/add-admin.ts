import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import { Admin } from "../../../models/adminUser.model";
import { ApiHandler } from "../../../interfaces/api-handler";

interface IRequest {
  name: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  password: string;
}

let addNewAdmin: ApiHandler<IRequest> = async (req, res) => {

    const { name, email, dateOfBirth, gender, phoneNumber, password } =
      req.body;

    const existUser = await Admin.findOne({ email });
    if (existUser) {
      return res
        .status(400)
        .json({
          errors: { email: ["this admin is already exist , please login"] },
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let admin = new Admin({
      name,
      email,
      dateOfBirth,
      gender,
      phoneNumber,
      password: hashedPassword,
    });

    await admin.save();

    return res.json({ message:"admin created successfully",data: { id: admin.id } });
  
};

export { addNewAdmin };
