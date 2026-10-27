import { Schema, models, model } from "mongoose";

const PageSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: String,
    headline: String,
    body: String,
    introHeadline: String,
    introBody: String,
    quote: String,
    aboutObjectiveTitle: String,
    aboutObjectiveBody: String,
    ctaHeadline: String,
    ctaBody: String,
    ctaButtonLabel: String,
    ctaButtonHref: String,
    ctaImageUrl: String,
    heroImageUrl: String,
    heroAccentWords: String,
    introAccentWords: String,
    extras: { type: Schema.Types.Mixed },
    seoTitle: String,
    seoDescription: String,
  },
  { timestamps: { createdAt: false, updatedAt: true }, minimize: false },
);

export const PageModel = models.Page || model("Page", PageSchema);