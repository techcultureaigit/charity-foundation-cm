import { Schema, models, model } from "mongoose";
import type { EnquiryStatus } from "@/lib/types";

export interface EnquiryDocument {
  name: string;
  email: string;
  mobile?: string;
  subject?: string;
  message: string;
  status: EnquiryStatus;
  createdAt: Date;
}

const EnquirySchema = new Schema<EnquiryDocument>(
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

export const EnquiryModel =
  models.Enquiry || model<EnquiryDocument>("Enquiry", EnquirySchema);
