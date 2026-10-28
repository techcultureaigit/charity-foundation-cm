const {
  Page,
  WorkArea,
  InvolvementCard,
  Cause,
  Event,
  Impact,
  Media,
  ContactSettings,
  Enquiry,
  Volunteer,
} = require("../models");
const {
  mapPage,
  mapWorkArea,
  mapInvolvement,
  mapCause,
  mapEvent,
  mapImpact,
  mapMedia,
  mapContact,
} = require("../utils/mappers");

async function getPage(req, res, next) {
  try {
    const doc = await Page.findOne({ slug: req.params.slug }).lean();
    if (!doc) return res.status(404).json({ ok: false, error: "Page not found" });
    return res.json({ ok: true, data: mapPage(doc) });
  } catch (err) {
    return next(err);
  }
}

async function getWorkAreas(_req, res, next) {
  try {
    const docs = await WorkArea.find({ isPublished: true }).sort({ order: 1 }).lean();
    return res.json({ ok: true, data: docs.map(mapWorkArea) });
  } catch (err) {
    return next(err);
  }
}

async function getInvolvement(_req, res, next) {
  try {
    const docs = await InvolvementCard.find({ isPublished: true })
      .sort({ order: 1 })
      .lean();
    return res.json({ ok: true, data: docs.map(mapInvolvement) });
  } catch (err) {
    return next(err);
  }
}

async function getCauses(_req, res, next) {
  try {
    const docs = await Cause.find({ isPublished: true }).sort({ order: 1 }).lean();
    return res.json({ ok: true, data: docs.map(mapCause) });
  } catch (err) {
    return next(err);
  }
}

async function getEvents(_req, res, next) {
  try {
    const docs = await Event.find({ isPublished: true }).sort({ order: 1 }).lean();
    return res.json({ ok: true, data: docs.map(mapEvent) });
  } catch (err) {
    return next(err);
  }
}

async function getImpact(_req, res, next) {
  try {
    const docs = await Impact.find({
      isPublished: true,
      isVerified: true,
      value: { $nin: ["", null] },
    })
      .sort({ _id: 1 })
      .lean();
    return res.json({ ok: true, data: docs.map(mapImpact) });
  } catch (err) {
    return next(err);
  }
}

async function getMedia(req, res, next) {
  try {
    const filter = { isPublished: true };
    if (req.query.category) filter.category = String(req.query.category);
    const docs = await Media.find(filter).sort({ createdAt: -1 }).lean();
    return res.json({ ok: true, data: docs.map(mapMedia) });
  } catch (err) {
    return next(err);
  }
}

async function getContact(_req, res, next) {
  try {
    const doc = await ContactSettings.findOne({ key: "primary" }).lean();
    if (!doc) return res.status(404).json({ ok: false, error: "Contact not found" });
    return res.json({ ok: true, data: mapContact(doc) });
  } catch (err) {
    return next(err);
  }
}

async function createEnquiry(req, res, next) {
  try {
    const { name, email, mobile, subject, message } = req.body || {};
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ ok: false, error: "Name, email, and message are required." });
    }
    const doc = await Enquiry.create({
      name: String(name).trim(),
      email: String(email).trim(),
      mobile: mobile ? String(mobile).trim() : undefined,
      subject: subject ? String(subject).trim() : undefined,
      message: String(message).trim(),
      status: "new",
    });
    return res.status(201).json({ ok: true, data: { id: String(doc._id) } });
  } catch (err) {
    return next(err);
  }
}

async function createVolunteer(req, res, next) {
  try {
    const { name, email, mobile, interest, message } = req.body || {};
    if (!name || !email || !interest) {
      return res
        .status(400)
        .json({ ok: false, error: "Name, email, and interest are required." });
    }
    const doc = await Volunteer.create({
      name: String(name).trim(),
      email: String(email).trim(),
      mobile: mobile ? String(mobile).trim() : undefined,
      interest: String(interest).trim(),
      message: message ? String(message).trim() : undefined,
      status: "new",
    });
    return res.status(201).json({ ok: true, data: { id: String(doc._id) } });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getPage,
  getWorkAreas,
  getInvolvement,
  getCauses,
  getEvents,
  getImpact,
  getMedia,
  getContact,
  createEnquiry,
  createVolunteer,
};
