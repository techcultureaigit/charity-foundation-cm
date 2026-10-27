import { Schema, models, model } from "mongoose";

export interface WorkAreaDocument {
  order: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl?: string;
  theme?: "pink" | "green" | "blue" | "orange";
  iconKey?: string;
  href?: string;
  isPublished: boolean;
}

const WorkAreaSchema = new Schema<WorkAreaDocument>({
  order: { type: Number, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: "" },
  theme: { type: String, enum: ["pink", "green", "blue", "orange"] },
  iconKey: { type: String, default: "" },
  href: { type: String, default: "" },
  isPublished: { type: Boolean, default: true },
});

export const WorkAreaModel =
  models.WorkArea || model<WorkAreaDocument>("WorkArea", WorkAreaSchema);
