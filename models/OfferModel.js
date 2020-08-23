const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OfferSchema = new Schema(
	{},
	{
		timestamps: true,
	}
);

const Offer = new mongoose.model("Offer", OfferSchema);

module.exports = Offer;
