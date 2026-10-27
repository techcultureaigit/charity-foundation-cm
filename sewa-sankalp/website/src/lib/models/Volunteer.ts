import { Schema, models, model } from "mongoose";

const VolunteerSchema = new Schema(
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
  models.Volunteer || model("Volunteer", VolunteerSchema);
