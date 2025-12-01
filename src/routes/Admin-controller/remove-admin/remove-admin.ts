import { Admin } from "../../../models/adminUser.model";
import { ApiHandler } from "../../../interfaces/api-handler";

interface IResponse {
  id: string;
}
interface IRequest {
  id: string;
}

const removeAdmin: ApiHandler<IRequest, IResponse> = async (req, res) => {
  try {
    const adminId = req.body.id;

    if (!adminId) {
      return res.status(400).json({
        errors: { error: ["Please provide the admin ID you want to remove."] },
      });
    }

    const deletedAdmin = await Admin.findByIdAndDelete(adminId);

    if (!deletedAdmin) {
      return res.status(404).json({ errors: { error: ["admin not found"] } });
    }

    return res.status(200).json({ message: "Admin removed successfully." });
  } catch (error) {
    let errorMessage = "Unknown error occurred";

    return res.status(500).json({
      errors: {
        error: [error instanceof Error ? error.message : errorMessage],
      },
    });
  }
};

export { removeAdmin };
