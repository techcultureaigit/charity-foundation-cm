import { Schema, models, model } from "mongoose";

const EventSchema = new Schema({
  order: Number,
  title: String,
  description: String,
  imageUrl: String,
  iconKey: String,
  dateLabel: String,
  location: String,
  ticketInfo: String,
  isFeatured: { type: Boolean, default: false },
  theme: String,
  href: String,
  isPublished: { type: Boolean, default: true },
});

export const EventModel = models.Event || model("Event", EventSchema, "events");