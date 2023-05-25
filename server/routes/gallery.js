//modules
const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

//middleware
const upload = require("../middlewares/uploadImage");

//upload image api
router.post("/upload", upload.single("gallery_image"), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Image is required" });
    const gallery_image = req.file;
    imageNames.push(gallery_image.filename);

    res.status(201).json({ message: "Image uploaded successfully", imageNameList: imageNames });
});

//get images api
router.get("/", (req, res) => {
    const folderPath = path.join(__dirname, "..", "public", "images");

    fs.readdir(folderPath, (err, files) => {
        if (err) return res.status(400).json({ message: err.message });

        res.status(200).json({ images: files });
    });
});

module.exports = router;
