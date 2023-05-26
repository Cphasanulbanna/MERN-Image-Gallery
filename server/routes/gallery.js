//modules
const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

//middleware
const upload = require("../middlewares/uploadImage");

const folderPath = path.join(__dirname, "..", "public", "images");

//upload image api
router.post("/upload", upload.single("gallery_image"), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    fs.readdir(folderPath, (err, files) => {
        if (err) return res.status(400).json({ message: err.message });

        const baseURL = `${req.protocol}://${req.get("host")}/images/`;
        const imageFullPath = files?.map((file) => {
            return baseURL + file;
        });

        res.status(200).json({ message: "image uploaded successfully", images: imageFullPath });
    });
});

//get images api
router.get("/", (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) return res.status(400).json({ message: err.message });

        if (!files.length)
            return res.status(200).json({
                message: "Image folder is empty, please upload some images",
                images: files,
            });

        const baseURL = `${req.protocol}://${req.get("host")}/images/`;
        const imageFullPath = files?.map((file) => {
            return baseURL + file;
        });
        res.status(200).json({ images: imageFullPath });
    });
});

module.exports = router;
