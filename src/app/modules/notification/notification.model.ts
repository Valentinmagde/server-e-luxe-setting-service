import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["order", "product", "contact", "customization"],
      required: true,
    },
    order_id: { type: mongoose.Schema.Types.ObjectId, required: false },
    product_id: { type: mongoose.Schema.Types.ObjectId, required: false },
    user_id: { type: mongoose.Schema.Types.ObjectId, required: false },
    name: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    subject: { type: String, required: false },
    message: { type: String, required: true },
    image: { type: String, required: false },
    status: { type: String, enum: ["read", "unread"], default: "unread" },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);

const Notification = mongoose.model("notification", notificationSchema);

export default Notification;
