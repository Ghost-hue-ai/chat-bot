import ChatModel from "../../models/chat.model.js";
import mongoose from "mongoose";
import { ApiError } from "../../helper/ApiError.js";

const fetchChatMessages = async (req, res) => {
  try {
    const chatId = req.query.chatId;
    if (!chatId) {
      throw new ApiError("chatId not provided", 400);
    }
    const chat = await ChatModel.findOne({
      _id: new mongoose.Types.ObjectId(chatId),
    });

    if (!chat) {
      throw new ApiError("failed fetching the chat detail from serer .", 500);
    }
    if (chat.messages.length === 0) {
      return res.status(200).json({
        message: "successfully fetched messages ",
        success: true,
        data: [],
      });
    }
    return res.status(200).json({
      message: "successfully fetched messages ",
      success: true,
      data: chat.messages,
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

export { fetchChatMessages };
