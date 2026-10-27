import { Schema, models, model } from "mongoose";

export interface EventDocument {
  order: number;
  title: string;
  description: string;
  imageUrl: string;
  iconKey: string;
  dateLabel: string;
  location: string;
  ticketInfo: string;
  isFeatured: boolean;
  theme: "green" | "blue" | "red";
  href: string;
  isPublished: boolean;
}

const EventSchema = new Schema<EventDocument>({
  order: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: "" },
  iconKey: { type: String, default: "" },
  dateLabel: { type: String, default: "" },
  location: { type: String, default: "" },
  ticketInfo: { type: String, default: "" },
  isFeatured: { type: Boolean, default: false },
  theme: { type: String, enum: ["green", "blue", "red"], default: "green" },
  href: { type: String, default: "/get-involved" },
  isPublished: { type: Boolean, default: true },
});

export const EventModel =
  models.Event || model<EventDocument>("Event", EventSchema, "events");
