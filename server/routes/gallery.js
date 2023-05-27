//modules
const express = require("express");

//middleware
const upload = require("../middlewares/uploadImage");

//function
const { fetchImages } = require("../utils");

const router = express.Router();

//upload image api
router.post("/upload", upload.single("gallery_image"), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    fetchImages(req, res);
});

//get images api
router.get("/", (req, res) => {
    fetchImages(req, res);
});

module.exports = router;
