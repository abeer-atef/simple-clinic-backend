import express from "express";
import { getAllAdmins } from "./get-all-admins/get-all-admins";
import { addAdminInputValidator } from "./add-admin/addAdminValidatorChain.middleware";
import { checkValidationResults } from "../../middlewares/checkValidationResults";
import { isAuthenticated } from "../../middlewares/isAuthenticated.middleware";
import { isAuthorized } from "../../middlewares/isAuthorized.middleware";
import { Role } from "../../utils/userRole";
import { checkAdminObjectIdFromBody, removeAdminIdValidator } from "./remove-admin/remove-admin-id-validator.middleware";
import { removeAdmin } from "./remove-admin/remove-admin";
import { updateAdminValidationChain } from "./update-admin/update-admin-middleware";
import { updateAdminInfo } from "./update-admin/update-admin";
import { addNewAdmin } from "./add-admin/add-admin";
import { checkAdminObjectIdFromParam, getAdminIdValidator } from "./get-admin-by-id/get-admin-by-id-validator.middleware";
import { getAdminById } from "./get-admin-by-id/get-admin-by-id";

const adminRouter = express.Router();

adminRouter.use(isAuthenticated, isAuthorized(Role.ADMIN));
// adminRouter.use(isAuthorized(Role.ADMIN));

adminRouter
  .route("/")
  .get(getAllAdmins)
  .post(addAdminInputValidator, checkValidationResults, addNewAdmin)
  .delete(
    removeAdminIdValidator,
    checkValidationResults,
    checkAdminObjectIdFromBody,
    removeAdmin
  )
  .patch(updateAdminValidationChain, checkValidationResults, updateAdminInfo);

adminRouter
  .route("/:id")
  .get(
    getAdminIdValidator,
    checkValidationResults,
    checkAdminObjectIdFromParam,
    getAdminById
  );

export { adminRouter };
