import { RequestHandler } from "express";
import { Appointment } from "../../../models/appointment.model";
import { getAppointmentResponse } from "./get-appointment-by-id.dto";

let getAppointmentById: RequestHandler<{ id: string }> = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({ _id: req.params.id });
    if (!appointment) {
      return res.status(400).json({ msg: "appointment not found" });
    }
    return res.json({
      status: "Success",
      Data: getAppointmentResponse(appointment),
    });
  }catch (error) {
    res
      .status(500)
      .json({ error: error instanceof Error ? error.message : error });
  }
};

export { getAppointmentById };
