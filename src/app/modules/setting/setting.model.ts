import mongoose from "mongoose";

const settingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    setting: {},
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

// module.exports = settingSchema;

const Setting = mongoose.model("setting", settingSchema);

export default Setting;
