const fs = require("fs/promises");
const path = require("path");
const {
  Page,
  WorkArea,
  InvolvementCard,
  Cause,
  Event,
  Impact,
  Media,
  ContactSettings,
  LegalPage,
  Enquiry,
  Volunteer,
} = require("../models");
const { uploadsDir } = require("../config/env");
const {
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
} = require("../utils/mappers");

const PAGE_ORDER = [
  "home",
  "about",
  "our-work",
  "get-involved",
  "impact-contact",
];

async function listPages(_req, res, next) {
  try {
    const docs = await Page.find().lean();
    const data = PAGE_ORDER.map((slug) => docs.find((d) => d.slug === slug))
      .filter(Boolean)
      .map(mapPage);
    return res.json({ ok: true, data });
  } catch (err) {
    return next(err);
  }
}

async function updatePage(req, res, next) {
  try {
    const doc = await Page.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: req.body || {} },
      { new: true },
    ).lean();
    if (!doc) return res.status(404).json({ ok: false, error: "Page not found" });
    return res.json({ ok: true, data: mapPage(doc) });
  } catch (err) {
    return next(err);
  }
}

function crudList(Model, mapFn, sort = { order: 1 }) {
  return async (_req, res, next) => {
    try {
      const docs = await Model.find().sort(sort).lean();
      return res.json({ ok: true, data: docs.map(mapFn) });
    } catch (err) {
      return next(err);
    }
  };
}

function crudCreate(Model, mapFn) {
  return async (req, res, next) => {
    try {
      const doc = await Model.create(req.body || {});
      return res.status(201).json({ ok: true, data: mapFn(doc.toObject()) });
    } catch (err) {
      return next(err);
    }
  };
}

function crudUpdate(Model, mapFn) {
  return async (req, res, next) => {
    try {
      const doc = await Model.findByIdAndUpdate(req.params.id, req.body || {}, {
        new: true,
      }).lean();
      if (!doc) return res.status(404).json({ ok: false, error: "Not found" });
      return res.json({ ok: true, data: mapFn(doc) });
    } catch (err) {
      return next(err);
    }
  };
}

function crudDelete(Model) {
  return async (req, res, next) => {
    try {
      await Model.findByIdAndDelete(req.params.id);
      return res.json({ ok: true });
    } catch (err) {
      return next(err);
    }
  };
}

async function updateImpact(req, res, next) {
  try {
    const body = { ...(req.body || {}) };
    if (body.isVerified === false) body.isPublished = false;
    const doc = await Impact.findByIdAndUpdate(req.params.id, body, {
      new: true,
    }).lean();
    if (!doc) return res.status(404).json({ ok: false, error: "Not found" });
    return res.json({ ok: true, data: mapImpact(doc) });
  } catch (err) {
    return next(err);
  }
}

async function getContact(_req, res, next) {
  try {
    const doc = await ContactSettings.findOne({ key: "primary" }).lean();
    if (!doc) return res.status(404).json({ ok: false, error: "Not found" });
    return res.json({ ok: true, data: mapContact(doc) });
  } catch (err) {
    return next(err);
  }
}

async function updateContact(req, res, next) {
  try {
    const doc = await ContactSettings.findOneAndUpdate(
      { key: "primary" },
      { $set: req.body || {} },
      { new: true, upsert: true },
    ).lean();
    return res.json({ ok: true, data: mapContact(doc) });
  } catch (err) {
    return next(err);
  }
}

async function listLegal(_req, res, next) {
  try {
    const docs = await LegalPage.find().sort({ slug: 1 }).lean();
    return res.json({ ok: true, data: docs.map(mapLegal) });
  } catch (err) {
    return next(err);
  }
}

async function updateLegal(req, res, next) {
  try {
    const doc = await LegalPage.findOneAndUpdate(
      { slug: req.params.slug },
      { $set: req.body || {} },
      { new: true, upsert: true },
    ).lean();
    return res.json({ ok: true, data: mapLegal(doc) });
  } catch (err) {
    return next(err);
  }
}

async function listEnquiries(_req, res, next) {
  try {
    const docs = await Enquiry.find().sort({ createdAt: -1 }).lean();
    return res.json({ ok: true, data: docs.map(mapEnquiry) });
  } catch (err) {
    return next(err);
  }
}

async function updateEnquiryStatus(req, res, next) {
  try {
    const doc = await Enquiry.findByIdAndUpdate(
      req.params.id,
      { status: req.body?.status },
      { new: true },
    ).lean();
    if (!doc) return res.status(404).json({ ok: false, error: "Not found" });
    return res.json({ ok: true, data: mapEnquiry(doc) });
  } catch (err) {
    return next(err);
  }
}

async function listVolunteers(_req, res, next) {
  try {
    const docs = await Volunteer.find().sort({ createdAt: -1 }).lean();
    return res.json({ ok: true, data: docs.map(mapVolunteer) });
  } catch (err) {
    return next(err);
  }
}

async function updateVolunteerStatus(req, res, next) {
  try {
    const doc = await Volunteer.findByIdAndUpdate(
      req.params.id,
      { status: req.body?.status },
      { new: true },
    ).lean();
    if (!doc) return res.status(404).json({ ok: false, error: "Not found" });
    return res.json({ ok: true, data: mapVolunteer(doc) });
  } catch (err) {
    return next(err);
  }
}

async function uploadMedia(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({ ok: false, error: "No file uploaded" });
    }
    await fs.mkdir(uploadsDir, { recursive: true });
    const ext = path.extname(req.file.originalname || "").toLowerCase() || ".jpg";
    const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext)
      ? ext
      : ".jpg";
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${safeExt}`;
    await fs.writeFile(path.join(uploadsDir, filename), req.file.buffer);
    const url = `/uploads/${filename}`;

    const title = String(req.body?.title || filename).trim();
    const alt = String(req.body?.alt || title).trim();
    const category = String(req.body?.category || "general").trim();
    const consentConfirmed = req.body?.consentConfirmed === "true";
    const isPublished = req.body?.isPublished !== "false";

    const doc = await Media.create({
      title,
      alt,
      url,
      category,
      consentConfirmed,
      isPublished,
    });

    return res.status(201).json({ ok: true, url, data: mapMedia(doc.toObject()) });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  listPages,
  updatePage,
  listWorkAreas: crudList(WorkArea, mapWorkArea),
  updateWorkArea: crudUpdate(WorkArea, mapWorkArea),
  listInvolvement: crudList(InvolvementCard, mapInvolvement),
  createInvolvement: crudCreate(InvolvementCard, mapInvolvement),
  updateInvolvement: crudUpdate(InvolvementCard, mapInvolvement),
  deleteInvolvement: crudDelete(InvolvementCard),
  listCauses: crudList(Cause, mapCause),
  createCause: crudCreate(Cause, mapCause),
  updateCause: crudUpdate(Cause, mapCause),
  deleteCause: crudDelete(Cause),
  listEvents: crudList(Event, mapEvent),
  createEvent: crudCreate(Event, mapEvent),
  updateEvent: crudUpdate(Event, mapEvent),
  deleteEvent: crudDelete(Event),
  listImpact: crudList(Impact, mapImpact, { _id: 1 }),
  updateImpact,
  listMedia: crudList(Media, mapMedia, { createdAt: -1 }),
  updateMedia: crudUpdate(Media, mapMedia),
  deleteMedia: crudDelete(Media),
  uploadMedia,
  getContact,
  updateContact,
  listLegal,
  updateLegal,
  listEnquiries,
  updateEnquiryStatus,
  listVolunteers,
  updateVolunteerStatus,
};
