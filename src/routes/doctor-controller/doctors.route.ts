import express from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated.middleware";
import { isAuthorized } from "../../middlewares/isAuthorized.middleware";
import { getAllDoctors } from "./get-all-doctors/get-all-doctors";
import {
  checkDoctorObjectIdFromBody,
  removeDoctorIdValidator,
} from "./remove-doctor/remove-doctor-id-validator.middleware";
import { checkValidationResults } from "../../middlewares/checkValidationResults";
import { removeDoctor } from "./remove-doctor/remove-doctor";
import { updateDoctorValidationChain } from "./update-doctor/doctor-validator.middleware";
import {
  checkUpdatedDoctorObjectIdFromBody,
  updateDoctorIdValidator,
} from "./update-doctor/id-validator.middleware.ts";
import { updateDoctorInfo } from "./update-doctor/update-doctor";
import {
  checkDoctorObjectIdFromParam,
  getDoctorIdValidator,
} from "./get-doctor-by-id/get-doctor-by-id-validator.middleware";
import { getDoctorById } from "./get-doctor-by-id/get-doctor-by-id";
import { Role } from "../../utils/userRole";
import { addNewDoctor } from "./add-doctor/add-doctor";
import { addDoctorValidationChain } from "./add-doctor/validation.middleware";

const doctorRouter = express.Router();

doctorRouter.use(isAuthenticated);

doctorRouter.get(
  "/:id",
  getDoctorIdValidator,
  checkValidationResults,
  checkDoctorObjectIdFromParam,
  getDoctorById
);

doctorRouter.get("/", getAllDoctors);


doctorRouter.use(isAuthorized(Role.ADMIN));


doctorRouter.post(
  "/new-doctor",
  addDoctorValidationChain,
  checkValidationResults,
  addNewDoctor
);
doctorRouter
  .route("/")
  .delete(
    removeDoctorIdValidator,
    checkValidationResults,
    checkDoctorObjectIdFromBody,
    removeDoctor
  )

  .patch(
    updateDoctorValidationChain,
    updateDoctorIdValidator,
    checkValidationResults,
    checkUpdatedDoctorObjectIdFromBody,
    updateDoctorInfo
  );

export { doctorRouter };
