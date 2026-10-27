import { Schema, models, model } from "mongoose";

export interface ImpactDocument {
  label: string;
  value: string;
  isVerified: boolean;
  isPublished: boolean;
}

const ImpactSchema = new Schema<ImpactDocument>({
  label: { type: String, required: true },
  value: { type: String, default: "" },
  isVerified: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: false },
});

export const ImpactModel =
  models.Impact || model<ImpactDocument>("Impact", ImpactSchema);
