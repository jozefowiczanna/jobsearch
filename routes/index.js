const express = require("express");
const router = express.Router();
const { offer } = require("../controllers");

router.get("/offers", offer.getAllOffers);
router.post("/offers", offer.addOffer);
router.get("/offers/:id", offer.getOffer);
router.put("/offers/:id", offer.updateOffer);
router.delete("/offers/:id", offer.deleteOffer);

module.exports = router;
