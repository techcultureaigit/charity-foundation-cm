import { Schema, models, model } from "mongoose";

const CauseSchema = new Schema({
  order: Number,
  title: String,
  description: String,
  imageUrl: String,
  iconKey: String,
  helpedCount: Number,
  goalCount: Number,
  href: String,
  isPublished: { type: Boolean, default: true },
});

export const CauseModel = models.Cause || model("Cause", CauseSchema, "causes");