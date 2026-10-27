import { connectMongo } from "@/lib/db/mongodb";
import { PageModel } from "@/lib/models/Page";
import { EnquiryModel } from "@/lib/models/Enquiry";
import { VolunteerModel } from "@/lib/models/Volunteer";
import { WorkAreaModel } from "@/lib/models/WorkArea";
import { ImpactModel } from "@/lib/models/Impact";
import { ContactSettingsModel } from "@/lib/models/ContactSettings";
import { LegalPageModel } from "@/lib/models/LegalPage";
import { InvolvementCardModel } from "@/lib/models/InvolvementCard";
import { CauseModel } from "@/lib/models/Cause";
import { EventModel } from "@/lib/models/Event";
import {
  ABOUT_BODY,
  ABOUT_HEADLINE,
  LEGACY_ABOUT_HEADLINE,
  causesSeed,
  contactSettingsSeed,
  enquiriesSeed,
  eventsSeed,
  impactSeed,
  involvementCardsSeed,
  legalPagesSeed,
  pagesSeed,
  volunteersSeed,
  workAreasSeed,
} from "@/lib/data/seed";
import { homeExtraDefaults } from "@/lib/data/homeExtras";

function fromIso(value: string) {
  return new Date(value);
}

const emptyFilter = (field: string) => ({
  $or: [
    { [field]: { $exists: false } },
    { [field]: "" },
    { [field]: null },
  ],
});

const homeScalarFields = [
  "introHeadline",
  "introBody",
  "quote",
  "aboutObjectiveTitle",
  "aboutObjectiveBody",
  "ctaHeadline",
  "ctaBody",
  "ctaButtonLabel",
  "ctaButtonHref",
  "ctaImageUrl",
  "heroImageUrl",
  "heroAccentWords",
  "introAccentWords",
] as const;

async function migratePages() {
  const homeSeed = pagesSeed.find((page) => page.slug === "home");
  if (homeSeed) {
    // Fill any empty home fields (never overwrites edited values).
    for (const field of homeScalarFields) {
      const value = homeSeed[field];
      if (!value) continue;
      await PageModel.updateOne(
        { slug: "home", ...emptyFilter(field) },
        { $set: { [field]: value } },
      );
    }

    const home = await PageModel.findOne({ slug: "home" }).lean();
    if (home) {
      const current = (home.extras ?? {}) as Record<string, string>;
      const missing = Object.entries(homeExtraDefaults).filter(
        ([key]) => current[key] === undefined,
      );
      if (missing.length > 0) {
        await PageModel.updateOne(
          { slug: "home" },
          { $set: { extras: { ...Object.fromEntries(missing), ...current } } },
        );
      }
    }
  }

  // About page copy from mockup — only if still the old, unedited seed headline.
  await PageModel.updateOne(
    { slug: "about", headline: LEGACY_ABOUT_HEADLINE },
    { $set: { headline: ABOUT_HEADLINE, body: ABOUT_BODY } },
  );

  // Contact page — fill new hero fields; refresh copy only if still legacy headline.
  const contactSeed = pagesSeed.find((page) => page.slug === "impact-contact");
  if (contactSeed) {
    await PageModel.updateOne(
      {
        slug: "impact-contact",
        headline:
          "The Measure of Our Work Is the Difference We Strive to Make.",
      },
      {
        $set: {
          title: contactSeed.title,
          headline: contactSeed.headline,
          body:
            contactSeed.body ??
            "We'd love to hear from you. Reach out to us for any queries, collaborations, partnerships or to get involved in our mission.",
          seoTitle: contactSeed.seoTitle,
          seoDescription: contactSeed.seoDescription,
          heroAccentWords: contactSeed.heroAccentWords ?? "Us",
          heroImageUrl: contactSeed.heroImageUrl ?? "/uploads/contact-hero.png",
        },
      },
    );
    await PageModel.updateOne(
      { slug: "impact-contact", ...emptyFilter("heroImageUrl") },
      {
        $set: {
          heroImageUrl: contactSeed.heroImageUrl ?? "/uploads/contact-hero.png",
        },
      },
    );
    await PageModel.updateOne(
      { slug: "impact-contact", ...emptyFilter("heroAccentWords") },
      { $set: { heroAccentWords: contactSeed.heroAccentWords ?? "Us" } },
    );
  }
}

async function migrateWorkAreas() {
  const byTitle = new Map(workAreasSeed.map((area) => [area.title, area]));
  const legacyRenames: Record<string, string> = {
    Education: "Education & Health",
  };

  // Only touch documents that have not been migrated yet (no theme).
  const pending = await WorkAreaModel.find({ theme: { $exists: false } }).lean();
  for (const doc of pending) {
    const seedTitle = legacyRenames[doc.title] ?? doc.title;
    const seed = byTitle.get(seedTitle);
    if (seed) {
      await WorkAreaModel.updateOne(
        { _id: doc._id },
        {
          $set: {
            title: seed.title,
            description: seed.description,
            order: seed.order,
            theme: seed.theme,
            iconKey: seed.iconKey,
            href: seed.href,
            imageUrl: doc.imageUrl ?? "",
          },
        },
      );
    } else {
      // Extra legacy areas (e.g. Health & Family Welfare) stay after the 4 home cards.
      await WorkAreaModel.updateOne(
        { _id: doc._id },
        {
          $set: {
            order: Math.max(doc.order ?? 5, 5),
            theme: "blue",
            iconKey: "heart",
            href: "/our-work",
            imageUrl: doc.imageUrl ?? "",
          },
        },
      );
    }
  }

  // Keep the four home focus-card photos on the seed uploads (layout match).
  for (const seed of workAreasSeed) {
    if (!seed.imageUrl) continue;
    await WorkAreaModel.updateOne(
      { title: seed.title },
      { $set: { imageUrl: seed.imageUrl } },
    );
  }
}

async function migrateImpact() {
  // Remove untouched legacy placeholders (empty, unverified) so mockup stats can be seeded.
  await ImpactModel.deleteMany({
    label: { $in: ["Families supported", "Children reached"] },
    isVerified: false,
    $or: [{ value: "" }, { value: null }, { value: { $exists: false } }],
  });

  const impactCount = await ImpactModel.countDocuments();
  if (impactCount === 0) {
    await ImpactModel.insertMany(
      impactSeed.map(({ id: _id, ...rest }) => rest),
    );
  }
}

async function fillCardImages() {
  for (const seed of involvementCardsSeed) {
    if (!seed.imageUrl) continue;
    await InvolvementCardModel.updateOne(
      { title: seed.title },
      { $set: { imageUrl: seed.imageUrl } },
    );
  }
  for (const seed of causesSeed) {
    if (!seed.imageUrl) continue;
    await CauseModel.updateOne(
      { title: seed.title },
      { $set: { imageUrl: seed.imageUrl } },
    );
  }
  for (const seed of eventsSeed) {
    if (!seed.imageUrl) continue;
    await EventModel.updateOne(
      { title: seed.title },
      { $set: { imageUrl: seed.imageUrl } },
    );
  }
}

async function seedWhenEmpty() {
  const involvementCount = await InvolvementCardModel.countDocuments();
  if (involvementCount === 0) {
    await InvolvementCardModel.insertMany(
      involvementCardsSeed.map(({ id: _id, ...rest }) => rest),
    );
  }

  const causeCount = await CauseModel.countDocuments();
  if (causeCount === 0) {
    await CauseModel.insertMany(causesSeed.map(({ id: _id, ...rest }) => rest));
  }

  const eventCount = await EventModel.countDocuments();
  if (eventCount === 0) {
    await EventModel.insertMany(eventsSeed.map(({ id: _id, ...rest }) => rest));
  }

  await fillCardImages();
}

declare global {
  // eslint-disable-next-line no-var
  var seedPromise: Promise<void> | undefined;
}

/**
 * Seeds/migrates once per server process (so deleting every item of a collection
 * in admin does not instantly re-seed it). Restart the admin server to re-run.
 */
export function ensureSeedData() {
  if (!global.seedPromise) {
    global.seedPromise = runSeed().catch((error) => {
      global.seedPromise = undefined;
      throw error;
    });
  }
  return global.seedPromise;
}

async function runSeed() {
  await connectMongo();

  const pageCount = await PageModel.countDocuments();
  if (pageCount === 0) {
    await PageModel.insertMany(
      pagesSeed.map((page) => ({
        ...page,
        updatedAt: fromIso(page.updatedAt),
      })),
    );
  } else {
    await migratePages();
  }

  const enquiryCount = await EnquiryModel.countDocuments();
  if (enquiryCount === 0) {
    await EnquiryModel.insertMany(
      enquiriesSeed.map(({ id: _id, createdAt, ...rest }) => ({
        ...rest,
        createdAt: fromIso(createdAt),
      })),
    );
  }

  const volunteerCount = await VolunteerModel.countDocuments();
  if (volunteerCount === 0) {
    await VolunteerModel.insertMany(
      volunteersSeed.map(({ id: _id, createdAt, ...rest }) => ({
        ...rest,
        createdAt: fromIso(createdAt),
      })),
    );
  }

  const workAreaCount = await WorkAreaModel.countDocuments();
  if (workAreaCount === 0) {
    await WorkAreaModel.insertMany(
      workAreasSeed.map(({ id: _id, ...rest }) => rest),
    );
  } else {
    await migrateWorkAreas();
  }

  await migrateImpact();
  await seedWhenEmpty();

  // Media is uploaded from admin — no placeholder image seed.

  const contactCount = await ContactSettingsModel.countDocuments();
  if (contactCount === 0) {
    await ContactSettingsModel.create({
      key: "primary",
      ...contactSettingsSeed,
    });
  } else {
    await ContactSettingsModel.updateOne(
      { key: "primary", ...emptyFilter("footerTagline") },
      { $set: { footerTagline: contactSettingsSeed.footerTagline } },
    );
  }

  const legalCount = await LegalPageModel.countDocuments();
  if (legalCount === 0) {
    await LegalPageModel.insertMany(
      legalPagesSeed.map(({ id: _id, updatedAt, ...rest }) => ({
        ...rest,
        updatedAt: fromIso(updatedAt),
      })),
    );
  }
}
