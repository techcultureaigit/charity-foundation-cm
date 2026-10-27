import { Schema, models, model } from "mongoose";

const WorkAreaSchema = new Schema({
  order: Number,
  title: String,
  subtitle: String,
  description: String,
  imageUrl: String,
  theme: String,
  iconKey: String,
  href: String,
  isPublished: { type: Boolean, default: true },
});

export const WorkAreaModel = models.WorkArea || model("WorkArea", WorkAreaSchema);