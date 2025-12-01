import { Admin } from "../../../models/adminUser.model";
import { ApiHandler } from "../../../interfaces/api-handler";

interface IResponse {
  id: string;
  name: string;
  gender: string;
  role: string;
}

interface Params {
  id: string;
}

const getAdminById: ApiHandler<{}, IResponse, {}, Params> = async (
  req,
  res
) => {
    const admin = await Admin.findById(req.params.id).select("name gender _id role");

    if (!admin) {
      return res.status(404).json({
        errors: { error: ["Admin not found"] },
      });
    }

    const response: IResponse = {
      id: admin.id,
      name: admin.name,
      gender: admin.gender,
      role: admin.role,
    };

    return res.status(200).json({ data: response });
  
};

export { getAdminById };
