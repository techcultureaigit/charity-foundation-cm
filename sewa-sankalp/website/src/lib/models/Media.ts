import { Schema, models, model } from "mongoose";

const MediaSchema = new Schema(
  {
    title: String,
    alt: String,
    url: String,
    category: {
      type: String,
      enum: [
        "hero",
        "work",
        "about",
        "general",
        "gallery",
        "focus",
        "cause",
        "event",
        "involve",
        "cta",
        "contact",
      ],
      default: "general",
    },
    consentConfirmed: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

export const MediaModel = models.Media || model("Media", MediaSchema);