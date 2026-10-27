import { Schema, models, model } from "mongoose";

export interface CauseDocument {
  order: number;
  title: string;
  description: string;
  imageUrl: string;
  iconKey: string;
  helpedCount: number;
  goalCount: number;
  href: string;
  isPublished: boolean;
}

const CauseSchema = new Schema<CauseDocument>({
  order: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: "" },
  iconKey: { type: String, default: "" },
  helpedCount: { type: Number, default: 0 },
  goalCount: { type: Number, default: 0 },
  href: { type: String, default: "/our-work" },
  isPublished: { type: Boolean, default: true },
});

export const CauseModel =
  models.Cause || model<CauseDocument>("Cause", CauseSchema, "causes");
