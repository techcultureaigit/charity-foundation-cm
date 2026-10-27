import { Schema, models, model } from "mongoose";
import type { VolunteerStatus } from "@/lib/types";

export interface VolunteerDocument {
  name: string;
  email: string;
  mobile?: string;
  interest: string;
  message?: string;
  status: VolunteerStatus;
  createdAt: Date;
}

const VolunteerSchema = new Schema<VolunteerDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: String,
    interest: { type: String, required: true },
    message: String,
    status: {
      type: String,
      enum: ["new", "contacted", "approved", "declined"],
      default: "new",
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const VolunteerModel =
  models.Volunteer || model<VolunteerDocument>("Volunteer", VolunteerSchema);
