import { Schema, models, model } from "mongoose";

const EnquirySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: String,
    subject: String,
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "read", "replied", "archived"],
      default: "new",
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const EnquiryModel = models.Enquiry || model("Enquiry", EnquirySchema);
