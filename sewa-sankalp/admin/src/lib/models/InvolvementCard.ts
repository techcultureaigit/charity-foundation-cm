import { Schema, models, model } from "mongoose";

export interface InvolvementCardDocument {
  order: number;
  title: string;
  description: string;
  imageUrl: string;
  iconKey: string;
  theme: "cream" | "mint" | "peach";
  ctaLabel: string;
  ctaHref: string;
  isPublished: boolean;
}

const InvolvementCardSchema = new Schema<InvolvementCardDocument>({
  order: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: "" },
  iconKey: { type: String, default: "" },
  theme: { type: String, enum: ["cream", "mint", "peach"], default: "cream" },
  ctaLabel: { type: String, required: true },
  ctaHref: { type: String, default: "/get-involved" },
  isPublished: { type: Boolean, default: true },
});

export const InvolvementCardModel =
  models.InvolvementCard ||
  model<InvolvementCardDocument>(
    "InvolvementCard",
    InvolvementCardSchema,
    "involvementcards",
  );
