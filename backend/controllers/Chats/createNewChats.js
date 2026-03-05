import ChatModel from "../../models/chat.model.js";
import { ApiError } from "../../helper/ApiError.js";
export async function createNewChat(req, res) {
  try {
    const { title } = await req.body;
    if (!title) {
      throw new ApiError("title not provided.", 400);
    }
    const newChat = await ChatModel.create({
      title,
    });
    if (!newChat) {
      throw new ApiError("failed to create new chat", 500);
    }
    return res.status(200).json({
      success: true,
      message: "successfully created new chat.",
      data: newChat,
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
}
