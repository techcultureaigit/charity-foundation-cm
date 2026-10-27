import { Schema, models, model } from "mongoose";
import type { MediaCategory } from "@/lib/types";

export interface MediaDocument {
  title: string;
  alt: string;
  url: string;
  category: MediaCategory;
  consentConfirmed: boolean;
  isPublished: boolean;
  createdAt: Date;
}

const MediaSchema = new Schema<MediaDocument>(
  {
    title: { type: String, required: true },
    alt: { type: String, required: true },
    url: { type: String, required: true },
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

export const MediaModel =
  models.Media || model<MediaDocument>("Media", MediaSchema);
