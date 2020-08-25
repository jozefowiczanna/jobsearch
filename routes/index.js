const express = require("express");
const router = express.Router();
const { offer } = require("../controllers");

router.get("/offers", offer.getAllOffers);
router.get("/offers/:id", offer.getOffer);
router.post("/offers", offer.addOffer);

router.put("/offers/:id", offer.updateOffer); // update?

module.exports = router;
