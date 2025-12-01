import express from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated.middleware";
import { isAuthorized } from "../../middlewares/isAuthorized.middleware";
import { Role } from "../../utils/userRole";
import { getUserAppointments } from "./get-appointment-bu-user-id/get-appointment-by-user-id";
import { getAllAppointments } from "./get-all-appointment/get-all-appointments";
import { checkDoctorAndPatientId } from "./add-new-appointment/checkDoctorAndPatientId.middleware";
import { checkValidationResults } from "../../middlewares/checkValidationResults";
import { isValidAppointmentDate } from "./add-new-appointment/appointmentDate.middleware";
import { createAppointment } from "./add-new-appointment/add-new-appointment";
import {
  checkObjectIdFromBody,
  idBodyValidator,
} from "./remove-appointment/remove-appointment-id.middleware";
import { removeAppointment } from "./remove-appointment/remove-appointment";
import { upload } from "../../middlewares/upload";
import {
  checkObjectIdFromParams,
  idParamValidator,
} from "./update-appointment/update-appointment-id.middleware";
import { updateAppointmentValidator } from "./update-appointment/appointment-status-validator.middleware";
import { updateAppointment } from "./update-appointment/update-appointment";
import { getAppointmentById } from "./get-appointment-by-id/get-appointment-by-id";
import { createAppointmentByUser } from "./add-new-appointment-by-user/add-new-appointment-by-uer";
import { checkDoctorId } from "./add-new-appointment-by-user/checkDoctorId.middleware";
import { isValidAppointmentDateUser } from "./add-new-appointment-by-user/userAppointmentDate.middleware";

const appointmentRouter = express.Router();

appointmentRouter.use(isAuthenticated);

appointmentRouter
  .route("/user-appointments")
  .get(isAuthorized(Role.PATIENT, Role.DOCTOR), getUserAppointments)
  .post(
    isAuthorized(Role.PATIENT),
    checkDoctorId,
    checkValidationResults,
    isValidAppointmentDateUser,
    createAppointmentByUser
  );

appointmentRouter.use(isAuthorized(Role.ADMIN));

appointmentRouter
  .route("/")
  .get(getAllAppointments)
  .post(
    checkDoctorAndPatientId,
    checkValidationResults,
    isValidAppointmentDate,
    createAppointment
  )
  .delete(
    idBodyValidator,
    checkValidationResults,
    checkObjectIdFromBody,
    removeAppointment
  );

appointmentRouter
  .route("/:id")
  .patch(
    checkObjectIdFromParams,
    idParamValidator,
    upload.single("prescriptionFile"),
    updateAppointmentValidator,
    checkValidationResults,
    updateAppointment
  )
  .get(
    isAuthorized(Role.ADMIN, Role.DOCTOR),
    idParamValidator,
    checkValidationResults,
    checkObjectIdFromParams,
    getAppointmentById
  );

export { appointmentRouter };
