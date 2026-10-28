const { Router } = require("express");
const publicController = require("../controllers/publicController");

const router = Router();

router.get("/pages/:slug", publicController.getPage);
router.get("/work-areas", publicController.getWorkAreas);
router.get("/involvement", publicController.getInvolvement);
router.get("/causes", publicController.getCauses);
router.get("/events", publicController.getEvents);
router.get("/impact", publicController.getImpact);
router.get("/media", publicController.getMedia);
router.get("/contact", publicController.getContact);
router.post("/enquiries", publicController.createEnquiry);
router.post("/volunteers", publicController.createVolunteer);

module.exports = router;
