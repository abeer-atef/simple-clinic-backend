import { ApiHandler } from "../../../interfaces/api-handler";
import { Admin } from "../../../models/adminUser.model";

type AdminResponse = {
  id: string;
  name: string;
  gender: string;
  role: string;
};

const getAllAdmins: ApiHandler<{}, AdminResponse[]> = async (req, res) => {
  try {
    const admins = await Admin.find().select("name gender _id role");

    const response: AdminResponse[] = admins.map((admin) => ({
      id: admin.id,
      name: admin.name,
      gender: admin.gender,
      role: admin.role,
    }));

    return res.status(200).json({ data: response });
  } catch (error) {
    const errorMessage = "Unknown error occurred";

    return res.status(500).json({
      errors: {
        error: [error instanceof Error ? error.message : errorMessage],
      },
    });
  }
};



export { getAllAdmins };
