import { ApiHandler } from "../../../interfaces/api-handler";

export const isValidAppointmentDate: ApiHandler<{ appointmentDate: Date }> = (
  req,
  res,
  next
) => {
  const date = req.body.appointmentDate;

  if (!date) {
    return res.status(400).json({
      errors: {
        appointmentDate: ["Appointment date is required"],
      },
    });
  }

  const dateMilliSeconds = new Date(date).getTime();

  if (isNaN(dateMilliSeconds) || dateMilliSeconds < Date.now()) {
    return res.status(400).json({
      errors: {
        appointmentDate: [
          "Invalid appointment date. It must be a valid date in the future.",
        ],
      },
    });
  }

  next();
};

