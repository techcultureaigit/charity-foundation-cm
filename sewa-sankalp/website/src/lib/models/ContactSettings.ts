import { Schema, models, model } from "mongoose";

const ContactSettingsSchema = new Schema({
  key: { type: String, unique: true, default: "primary" },
  address: String,
  phone: String,
  email: String,
  website: String,
  socialLinks: {
    facebook: String,
    instagram: String,
    twitter: String,
    youtube: String,
    linkedin: String,
  },
  footerTagline: String,
});

export const ContactSettingsModel =
  models.ContactSettings || model("ContactSettings", ContactSettingsSchema);