import { body } from "express-validator";
import { enAppointmentStatus } from "./appointment-request";

export const updateAppointmentValidator = [body("appointmentStatus").optional()
  .isIn(Object.values(enAppointmentStatus))
  .withMessage(
    "invalid appointment status,[Pending,Completed,Canceled,Rescheduled,No Show]"
  ),body("appointmentDate").optional().isISO8601()
    .withMessage("Appointment date must be a valid date in format (YYYY-MM-DD)"),
];


