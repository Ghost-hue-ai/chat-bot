import ChatModel from "../../models/chat.model.js";
import { ApiError } from "../../helper/ApiError.js";
const fetchAllChats = async (req, res) => {
  try {
    const chats = await ChatModel.find({});
    if (chats.length === 0) {
      throw new ApiError("failed loading chats", 500);
    }
    return res.status(200).json({
      message: "successfully fetched chats",
      success: true,
      data: chats,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return res.status(error.status).json({
        message: error.message,
        success: false,
      });
    } else {
      return res.status(500).json({
        message: error.message,
        success: false,
      });
    }
  }
};

export { fetchAllChats };
