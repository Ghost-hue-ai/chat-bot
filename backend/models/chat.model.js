import mongoose, { mongo, Mongoose } from "mongoose";

const chatSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    messages: [
      {
        userRequest: String,
        aiResponse: String,
        created_at: Date,
      },
    ],
  },
  { timestamps: true },
);

const ChatModel = mongoose.model("Chat", chatSchema);

export default ChatModel;
