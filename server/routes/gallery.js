//modules
const express = require("express");
const router = express.Router();

//middleware
const upload = require("../middlewares/uploadImage");

//upload image api
router.post("/upload", upload.single("gallery_image"), (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Image is required" });
    const gallery_image = req.file;
    res.status(201).json({ message: "Image uploaded successfully" });
});

module.exports = router;
