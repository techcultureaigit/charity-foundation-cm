const mongoose = require("mongoose");
const { Schema, model, models } = mongoose;

const PageSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      enum: ["home", "about", "our-work", "get-involved", "impact-contact"],
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

const WorkAreaSchema = new Schema({
  order: { type: Number, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: "" },
  theme: { type: String, enum: ["pink", "green", "blue", "orange"] },
  iconKey: { type: String, default: "" },
  href: { type: String, default: "" },
  isPublished: { type: Boolean, default: true },
});

const InvolvementCardSchema = new Schema({
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

const CauseSchema = new Schema({
  order: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: "" },
  iconKey: { type: String, default: "" },
  helpedCount: { type: Number, default: 0 },
  goalCount: { type: Number, default: 0 },
  href: { type: String, default: "/our-work" },
  isPublished: { type: Boolean, default: true },
});

const EventSchema = new Schema({
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

const ImpactSchema = new Schema({
  label: { type: String, required: true },
  value: { type: String, default: "" },
  isVerified: { type: Boolean, default: false },
  isPublished: { type: Boolean, default: false },
});

const MediaSchema = new Schema(
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

const ContactSettingsSchema = new Schema({
  key: { type: String, required: true, unique: true, default: "primary" },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String, required: true },
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String,
    linkedin: String,
  },
  footerTagline: String,
});

const LegalPageSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: false, updatedAt: true } },
);

const EnquirySchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: String,
    subject: String,
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "read", "replied", "archived"],
      default: "new",
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

const VolunteerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: String,
    interest: { type: String, required: true },
    message: String,
    status: {
      type: String,
      enum: ["new", "contacted", "approved", "declined"],
      default: "new",
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

module.exports = {
  Page: models.Page || model("Page", PageSchema),
  WorkArea: models.WorkArea || model("WorkArea", WorkAreaSchema),
  InvolvementCard:
    models.InvolvementCard ||
    model("InvolvementCard", InvolvementCardSchema, "involvementcards"),
  Cause: models.Cause || model("Cause", CauseSchema, "causes"),
  Event: models.Event || model("Event", EventSchema, "events"),
  Impact: models.Impact || model("Impact", ImpactSchema),
  Media: models.Media || model("Media", MediaSchema),
  ContactSettings:
    models.ContactSettings || model("ContactSettings", ContactSettingsSchema),
  LegalPage: models.LegalPage || model("LegalPage", LegalPageSchema),
  Enquiry: models.Enquiry || model("Enquiry", EnquirySchema),
  Volunteer: models.Volunteer || model("Volunteer", VolunteerSchema),
};
