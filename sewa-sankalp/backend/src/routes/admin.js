const { Router } = require("express");
const multer = require("multer");
const { requireAdmin } = require("../middleware/auth");
const adminController = require("../controllers/adminController");

const upload = multer({
  storage: multer.memoryStorage(),
  // Vercel serverless request body cap is ~4.5MB — keep multer in sync
  limits: { fileSize: Math.floor(4.5 * 1024 * 1024) },
});

const router = Router();
router.use(requireAdmin);

router.get("/pages", adminController.listPages);
router.put("/pages/:slug", adminController.updatePage);

router.get("/work-areas", adminController.listWorkAreas);
router.put("/work-areas/:id", adminController.updateWorkArea);

router.get("/involvement", adminController.listInvolvement);
router.post("/involvement", adminController.createInvolvement);
router.put("/involvement/:id", adminController.updateInvolvement);
router.delete("/involvement/:id", adminController.deleteInvolvement);

router.get("/causes", adminController.listCauses);
router.post("/causes", adminController.createCause);
router.put("/causes/:id", adminController.updateCause);
router.delete("/causes/:id", adminController.deleteCause);

router.get("/events", adminController.listEvents);
router.post("/events", adminController.createEvent);
router.put("/events/:id", adminController.updateEvent);
router.delete("/events/:id", adminController.deleteEvent);

router.get("/impact", adminController.listImpact);
router.put("/impact/:id", adminController.updateImpact);

router.get("/media", adminController.listMedia);
router.put("/media/:id", adminController.updateMedia);
router.delete("/media/:id", adminController.deleteMedia);
router.post("/media/upload", upload.single("file"), adminController.uploadMedia);

router.get("/contact", adminController.getContact);
router.put("/contact", adminController.updateContact);

router.get("/legal", adminController.listLegal);
router.put("/legal/:slug", adminController.updateLegal);

router.get("/enquiries", adminController.listEnquiries);
router.patch("/enquiries/:id/status", adminController.updateEnquiryStatus);

router.get("/volunteers", adminController.listVolunteers);
router.patch("/volunteers/:id/status", adminController.updateVolunteerStatus);

router.get("/campaigns", adminController.listCampaigns);
router.post("/campaigns", adminController.createCampaign);
router.put("/campaigns/:id", adminController.updateCampaign);
router.delete("/campaigns/:id", adminController.deleteCampaign);

router.get("/blog-posts", adminController.listBlogPosts);
router.post("/blog-posts", adminController.createBlogPost);
router.put("/blog-posts/:id", adminController.updateBlogPost);
router.delete("/blog-posts/:id", adminController.deleteBlogPost);

module.exports = router;
