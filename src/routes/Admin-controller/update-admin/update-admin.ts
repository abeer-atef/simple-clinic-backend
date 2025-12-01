import bcrypt from "bcryptjs";
import { Admin } from "../../../models/adminUser.model";
import { ApiHandler } from "../../../interfaces/api-handler";

interface IRequest {
  name?: string;
  address?: string;
  dateOfBirth?: string;
  gender?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
}

const updateAdminInfo: ApiHandler<IRequest> = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ errors: { error: ["unauthorized"] } });
    }

    const admin = await Admin.findById(userId);
    if (!admin) {
      return res.status(404).json({
        errors: {
          general: ["Admin not found"],
        },
      });
    }

    const allowedUpdates: (keyof IRequest)[] = [
      "name",
      "address",
      "dateOfBirth",
      "gender",
      "email",
      "phoneNumber",
    ];
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        (admin as any)[field] = req.body[field];
      }
    });
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      admin.password = hashedPassword;
    }
    await admin.save();

    return res.status(200).json({
      message:"admin updated successfully",
      data: {
        id: admin.id,
      },
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        general: [
          error instanceof Error ? error.message : "Unknown server error",
        ],
      },
    });
  }
};

export { updateAdminInfo };
