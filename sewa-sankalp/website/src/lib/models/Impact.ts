import { Schema, models, model } from "mongoose";

const ImpactSchema = new Schema({
  label: String,
  value: String,
  isVerified: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: false },
});

export const ImpactModel = models.Impact || model("Impact", ImpactSchema);
