const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const OfferSchema = new Schema(
	{
		company: { type: String, required: true },
		position: { type: String, required: true },
		link: { type: String, required: true },
		city: { type: String },
		address: { type: String },
		techStack: { type: String },
		description: { type: String },
		skills: { type: String },
		addSkills: { type: String },
		offer: { type: String },
		payScales: { type: String },
		deadline: { type: String },
		remarks: { type: String },
		level: { type: String },
		status: { type: String },
	},
	{
		timestamps: true,
	}
);

const Offer = new mongoose.model("Offer", OfferSchema);

module.exports = Offer;
