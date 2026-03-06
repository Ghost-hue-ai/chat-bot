import ChatModel from "../../models/chat.model.js";
import { ApiError } from "../../helper/ApiError.js";
import { sendRequest } from "../../services/aiService.js";
import mongoose from "mongoose";

const getAiResponse = async (req, res) => {
  try {
    const { userReq, chatId } = await req.body;
    if (!userReq) {
      throw new ApiError("no request found ", 400);
    }
    if (!chatId) {
      throw new ApiError("chatId not provided", 400);
    }
    const response = await sendRequest(userReq);

    if (!response) {
      throw new ApiError("failed to fetch response", 500);
    }
    const message = {
      userRequest: userReq,
      aiResponse: response,
    };
    const chat = await ChatModel.findOne({
      _id: new mongoose.Types.ObjectId(chatId),
    });
    if (!chat) {
      throw new ApiError("chat not found", 404);
    }
    chat.messages.push(message);
    await chat.save();

    res.status(200).json({
      message: "successfully sent request",
      success: true,
      data: response,
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

export { getAiResponse };
