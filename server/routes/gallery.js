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
    // const gallery_image = req.file;
    // imageNames.push(gallery_image.filename);

    res.status(201).json({ message: "Image uploaded successfully" });
});

//get images api
router.get("/", (req, res) => {
    const folderPath = path.join(__dirname, "..", "public", "images");

    console.log(folderPath);

    const baseURL = `${req.protocol}://${req.get("host")}/images/`;

    fs.readdir(folderPath, (err, files) => {
        if (err) return res.status(400).json({ message: err.message });

        if (!files.length)
            return res.status(200).json({
                message: "Image folder is empty, please upload some images",
                images: files,
            });
        files.forEach((file) => {
            const imageFullPath = baseURL + file;
            res.status(200).json({ images: imageFullPath });
        });
    });
});

module.exports = router;
