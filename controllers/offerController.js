const Offer = require("../models/OfferModel");

const error500 = "Internal server error";
const error404 = "Data not found";

const offer = {
	addOffer: (req, res) => {
		const offerObj = {};
		Object.entries(req.body).forEach(([key, value]) => {
			offerObj[key] = value.trim();
		});
		console.log(offerObj);
		const newOffer = new Offer(offerObj);
		newOffer
			.save()
			.then((offer) => res.json(offer))
			.catch((err) => {
				console.log(err);
				return res.status(500).json(error500);
			});
	},
	getAllOffers: (req, res) => {
		Offer.find({})
			.then((offers) => {
				return res.status(200).json(offers);
			})
			.catch((err) => {
				console.log(err);
				return res.status(500).json(error500);
			});
	},
	getOffer: (req, res) => {
		Offer.findOne({ _id: req.params.id })
			.then((offer) => {
				if (!offer) {
					return res.status(404).json(error404);
				}
				return res.status(200).json(offer);
			})
			.catch((err) => {
				console.log(err);
				// Invalid ObjectID
				if (err.name === "CastError") {
					return res.status(404).json(error404);
				}
				return res.status(500).json(error500);
			});
	},
};

module.exports = offer;
