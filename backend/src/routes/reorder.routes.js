const express = require("express");
const router = express.Router();

const {
  getReorderRecommendations,
} = require("../controllers/reorder.controller");

router.get("/", getReorderRecommendations);

module.exports = router;