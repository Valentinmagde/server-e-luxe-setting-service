import mongoose from "mongoose";

const languageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    iso_code: { type: String, required: true },
    flag: { type: String, required: false },
    status: {
      type: String,
      lowercase: true,
      enum: ["show", "hide"],
      default: "show",
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

const Language = mongoose.model("language", languageSchema);

export default Language;
