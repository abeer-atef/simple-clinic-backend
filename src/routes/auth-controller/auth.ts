import { RequestHandler } from "express";
import { Person } from "../../models/person.model";
import bcrypt from "bcryptjs";
import { Role } from "../../utils/userRole";
import { Patient } from "../../models/patient.model";
import { enGender } from "../../utils/user-gender";
import { Admin } from "../../models/adminUser.model";
import { emailService } from "../../../services/email.service";
import { jwtService } from "../../../services/jwt.service";
import { ApiHandler } from "../../interfaces/api-handler";

interface IRegisterRequest {
  name: string;
  email: string;
  dateOfBirth: string;
  gender: enGender;
  phoneNumber: string;
  password: string;
}

interface ILoginRequest {
  email: string;
  password: string;
}
let register: ApiHandler<IRegisterRequest> = async (req, res) => {
    const { name, email, dateOfBirth, gender, phoneNumber, password } =
      req.body;

    if (
      !name ||
      !email ||
      !dateOfBirth ||
      !gender ||
      !phoneNumber ||
      !password
    ) {
      return res.status(400).json({ 
        errors: {
          fields:["All fields are required"]
        },
      });
    }

    const existUser = await Person.findOne({ email });

    if (existUser) {
      return res.status(409).json({
        errors: {
          email: ["This email is already registered, please login instead."],
        },
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = new Person({
      name,
      email,
      dateOfBirth,
      gender,
      phoneNumber,
      password: hashedPassword,
      role: Role.PATIENT,
    });

    const patient = new Patient({
      personId: user._id,
    });

    await user.save();
    await patient.save();

    await emailService.resetVerification(user, "8h");

    return res.json({
      message: "user created successfully, please check your inbox and verify your email",
    });

};

const login: ApiHandler<ILoginRequest> = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
      errors: {
        email: !email ? ["Email is required"] : [],
        password: !password ? ["Password is required"] : [],
      },
    });
  }

    const user =
      (await Person.findOne({ email })) ?? (await Admin.findOne({ email }));

    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return res.status(401).json({
        message: "Invalid credentials",
        errors: {
          auth: ["Invalid email or password"],
        },
      });
    }

    if (!user.isEmailVerified) {
      await emailService.resetVerification(user, "8h");
      return res.status(403).json({
        message: "Please verify your email first",
        errors: {
          email: ["Email not verified. Verification email resent."],
        },
      });
    }

    const token = jwtService.createToken(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      { expiresIn: "8h" }
    );

    res.cookie("token", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 8 });

    return res.json({
      message: "Login successful",
    });
  };

const Logout: ApiHandler<{}> = (req, res) => {
  const token = req.cookies?.token;
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout successful" });
};

export { register, login, Logout };
