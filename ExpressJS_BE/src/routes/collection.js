const express = require("express");
const router = express.Router();
const { getCollections } = require("../controllers/collectionController");

router.get("/", getCollections);

module.exports = router;
