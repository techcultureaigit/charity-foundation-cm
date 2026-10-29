import { Schema, models, model } from "mongoose";
import type { PageSlug } from "@/lib/types";

export interface PageDocument {
  slug: PageSlug;
  title: string;
  headline: string;
  body: string;
  introHeadline?: string;
  introBody?: string;
  quote?: string;
  aboutObjectiveTitle?: string;
  aboutObjectiveBody?: string;
  ctaHeadline?: string;
  ctaBody?: string;
  ctaButtonLabel?: string;
  ctaButtonHref?: string;
  ctaImageUrl?: string;
  heroImageUrl?: string;
  heroAccentWords?: string;
  introAccentWords?: string;
  extras?: Record<string, string>;
  seoTitle: string;
  seoDescription: string;
  updatedAt: Date;
}

const PageSchema = new Schema<PageDocument>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      enum: [
        "home",
        "about",
        "our-work",
        "get-involved",
        "impact-contact",
        "education",
        "campaigns",
        "gallery",
        "blog",
      ],
    },
    title: { type: String, required: true },
    headline: { type: String, required: true },
    body: { type: String, required: true },
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
    seoTitle: { type: String, required: true },
    seoDescription: { type: String, required: true },
  },
  { timestamps: { createdAt: false, updatedAt: true }, minimize: false },
);

export const PageModel = models.Page || model<PageDocument>("Page", PageSchema);
