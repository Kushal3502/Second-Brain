import mongoose from "mongoose";

const contentTypes = ["audio", "video", "image", "article"];

const brainSchema = new mongoose.Schema(
  {
    link: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: contentTypes,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Tag",
      },
    ],
    description: {
      type: String,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Brain = mongoose.model("Brain", brainSchema);
