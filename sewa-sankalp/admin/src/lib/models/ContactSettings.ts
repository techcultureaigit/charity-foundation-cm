import { Schema, models, model } from "mongoose";

export interface ContactSettingsDocument {
  key: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string;
  };
  footerTagline?: string;
}

const ContactSettingsSchema = new Schema<ContactSettingsDocument>({
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

export const ContactSettingsModel =
  models.ContactSettings ||
  model<ContactSettingsDocument>("ContactSettings", ContactSettingsSchema);
