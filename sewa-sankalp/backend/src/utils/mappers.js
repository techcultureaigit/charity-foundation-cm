function idOf(doc) {
  return String(doc._id);
}

function mapPage(doc) {
  return {
    slug: doc.slug,
    title: doc.title,
    headline: doc.headline,
    body: doc.body,
    introHeadline: doc.introHeadline || "",
    introBody: doc.introBody || "",
    quote: doc.quote || "",
    aboutObjectiveTitle: doc.aboutObjectiveTitle || "",
    aboutObjectiveBody: doc.aboutObjectiveBody || "",
    ctaHeadline: doc.ctaHeadline || "",
    ctaBody: doc.ctaBody || "",
    ctaButtonLabel: doc.ctaButtonLabel || "",
    ctaButtonHref: doc.ctaButtonHref || "",
    ctaImageUrl: doc.ctaImageUrl || "",
    heroImageUrl: doc.heroImageUrl || "",
    heroAccentWords: doc.heroAccentWords || "",
    introAccentWords: doc.introAccentWords || "",
    extras: doc.extras || undefined,
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined,
  };
}

function mapWorkArea(doc) {
  return {
    id: idOf(doc),
    order: doc.order ?? 0,
    title: doc.title,
    subtitle: doc.subtitle,
    description: doc.description,
    imageUrl: doc.imageUrl || "",
    theme: doc.theme,
    iconKey: doc.iconKey || "",
    href: doc.href || "",
    isPublished: Boolean(doc.isPublished),
  };
}

function mapInvolvement(doc) {
  return {
    id: idOf(doc),
    order: doc.order ?? 0,
    title: doc.title,
    description: doc.description,
    imageUrl: doc.imageUrl || "",
    iconKey: doc.iconKey || "",
    theme: doc.theme || "cream",
    ctaLabel: doc.ctaLabel,
    ctaHref: doc.ctaHref || "",
    isPublished: Boolean(doc.isPublished),
  };
}

function mapCause(doc) {
  return {
    id: idOf(doc),
    order: doc.order ?? 0,
    title: doc.title,
    description: doc.description,
    imageUrl: doc.imageUrl || "",
    iconKey: doc.iconKey || "",
    helpedCount: doc.helpedCount ?? 0,
    goalCount: doc.goalCount ?? 0,
    href: doc.href || "",
    isPublished: Boolean(doc.isPublished),
  };
}

function mapEvent(doc) {
  return {
    id: idOf(doc),
    order: doc.order ?? 0,
    title: doc.title,
    description: doc.description,
    imageUrl: doc.imageUrl || "",
    iconKey: doc.iconKey || "",
    dateLabel: doc.dateLabel || "",
    location: doc.location || "",
    ticketInfo: doc.ticketInfo || "",
    isFeatured: Boolean(doc.isFeatured),
    theme: doc.theme || "green",
    href: doc.href || "",
    isPublished: Boolean(doc.isPublished),
  };
}

function mapImpact(doc) {
  return {
    id: idOf(doc),
    label: doc.label,
    value: doc.value || "",
    isVerified: Boolean(doc.isVerified),
    isPublished: Boolean(doc.isPublished),
  };
}

function mapMedia(doc) {
  return {
    id: idOf(doc),
    title: doc.title,
    alt: doc.alt,
    url: doc.url,
    category: doc.category,
    consentConfirmed: Boolean(doc.consentConfirmed),
    isPublished: Boolean(doc.isPublished),
    createdAt: doc.createdAt
      ? new Date(doc.createdAt).toISOString()
      : "1970-01-01T00:00:00.000Z",
  };
}

function mapContact(doc) {
  return {
    address: doc.address,
    phone: doc.phone,
    email: doc.email,
    website: doc.website,
    socialLinks: doc.socialLinks || {},
    footerTagline: doc.footerTagline || "",
  };
}

function mapLegal(doc) {
  return {
    id: idOf(doc),
    title: doc.title,
    slug: doc.slug,
    content: doc.content,
    isPublished: Boolean(doc.isPublished),
    updatedAt: doc.updatedAt ? new Date(doc.updatedAt).toISOString() : undefined,
  };
}

function mapEnquiry(doc) {
  return {
    id: idOf(doc),
    name: doc.name,
    email: doc.email,
    mobile: doc.mobile || "",
    subject: doc.subject || "",
    message: doc.message,
    status: doc.status,
    createdAt: doc.createdAt
      ? new Date(doc.createdAt).toISOString()
      : "1970-01-01T00:00:00.000Z",
  };
}

function mapVolunteer(doc) {
  return {
    id: idOf(doc),
    name: doc.name,
    email: doc.email,
    mobile: doc.mobile || "",
    interest: doc.interest,
    message: doc.message || "",
    status: doc.status,
    createdAt: doc.createdAt
      ? new Date(doc.createdAt).toISOString()
      : "1970-01-01T00:00:00.000Z",
  };
}

module.exports = {
  mapPage,
  mapWorkArea,
  mapInvolvement,
  mapCause,
  mapEvent,
  mapImpact,
  mapMedia,
  mapContact,
  mapLegal,
  mapEnquiry,
  mapVolunteer,
};
