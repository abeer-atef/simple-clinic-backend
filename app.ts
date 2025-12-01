import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { CustomValidationError } from "./src/middlewares/checkValidationResults";
import { authRouter } from "./src/routes/auth-controller/auth.router";
import { patientRouter } from "./src/routes/patient-controller/patient.router";
import { doctorRouter } from "./src/routes/doctor-controller/doctors.route";
import { appointmentRouter } from "./src/routes/appointment-controller/appointment.route";
import { adminRouter } from "./src/routes/Admin-controller/admins.router";
import cors from "cors"



mongoose
  .connect("mongodb://127.0.0.1:27017/simpleClinicDB")
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.log("error in connection", err);
  });

dotenv.config();
const app = express();

app.use(cors(
    {
    origin:[
  "http://127.0.0.1:5500",
  "http://127.0.0.1:4000",
],
methods:["GET","POST","PUT","DELETE"],
}));

app.use(helmet());

app.use(compression());

app.use(
  rateLimit({
    windowMs: 1000 * 60 * 60,
    max: 100,
    message: "maximum number of requests per hour is 100 req",
  })
);

app.use(express.json({ limit: "5mb" }));

app.use(cookieParser());
app.use(express.static("public/uploads"));

app.use("/api/auth", authRouter);

app.use("/api/patients", patientRouter);

app.use("/api/doctors", doctorRouter);

app.use("/api/appointments", appointmentRouter);

app.use("/api/admins", adminRouter);

app.use((req, res) => {
  return res.status(404).json({ msg: "can not find this page" });
});

app.use((err: any, req: any, res: any, next: any) => {
  if (err instanceof CustomValidationError) {
    return res.json({ errors: err.getErrors() });
  }
  return res.json({ err });
});

app.listen( 3000, () => {
  console.log("port 3000");
});
