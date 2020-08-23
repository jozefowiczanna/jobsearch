const express = require("express");
const router = express.Router();
// const { user, score } = require("../controllers");

// router.get("/scores", score.getAllScores)

router.get("/test", (req, res) => {
	return res.send("Testing route");
});

module.exports = router;
