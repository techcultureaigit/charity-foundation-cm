import { Schema, models, model } from "mongoose";

const InvolvementCardSchema = new Schema({
  order: Number,
  title: String,
  description: String,
  imageUrl: String,
  iconKey: String,
  theme: String,
  ctaLabel: String,
  ctaHref: String,
  isPublished: { type: Boolean, default: true },
});

export const InvolvementCardModel =
  models.InvolvementCard ||
  model("InvolvementCard", InvolvementCardSchema, "involvementcards");