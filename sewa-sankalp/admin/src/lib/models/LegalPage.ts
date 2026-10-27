import { Schema, models, model } from "mongoose";

export interface LegalPageDocument {
  title: string;
  slug: string;
  content: string;
  isPublished: boolean;
  updatedAt: Date;
}

const LegalPageSchema = new Schema<LegalPageDocument>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: false, updatedAt: true } },
);

export const LegalPageModel =
  models.LegalPage || model<LegalPageDocument>("LegalPage", LegalPageSchema);
