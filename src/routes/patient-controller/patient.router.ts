import express from "express";
import { isAuthenticated } from "../../middlewares/isAuthenticated.middleware";
import { isAuthorized } from "../../middlewares/isAuthorized.middleware";
import { Role } from "../../utils/userRole";
import { getAllPatients } from "./get-all-patients/get-all-patients";
import { checkPatientObjectIdFromBody, removePatientIdValidator } from "./delete-patient/remove-patient-id-validator.middleware";
import { checkValidationResults } from "../../middlewares/checkValidationResults";
import { removePatient } from "./delete-patient/delete-patient";
import { updatePatientValidationChain } from "./update-patient/update-patient-validator.middleware";
import { updatePatientInfo } from "./update-patient/update-patient";
import { getPatientIdValidator } from "./get-patient-by-id/get-patient-by-id-validator.middleware";
import { checkAdminObjectIdFromParam } from "../Admin-controller/get-admin-by-id/get-admin-by-id-validator.middleware";
import { getPatientById } from "./get-patient-by-id/get-patient-by-id";

const patientRouter = express.Router();

patientRouter.use(isAuthenticated);

patientRouter
  .route("/")

  .get(isAuthorized(Role.ADMIN), getAllPatients)

  .delete(
    isAuthorized(Role.ADMIN),
    removePatientIdValidator,
    checkValidationResults,
    checkPatientObjectIdFromBody,
    removePatient
  )

  .patch(
        isAuthorized(Role.PATIENT),
    updatePatientValidationChain,
    checkValidationResults,
    updatePatientInfo
  );
patientRouter
  .route("/:id")
  .get(
    isAuthorized(Role.ADMIN, Role.DOCTOR),
    getPatientIdValidator,
    checkValidationResults,
    checkAdminObjectIdFromParam,
    getPatientById
  );

export { patientRouter };
