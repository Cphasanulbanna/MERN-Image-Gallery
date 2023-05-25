//modules
const express = require("express");
const router = express.Router();

//middleware
const upload = require("../middlewares/uploadImage");

const imageNames = [];

//upload image api
router.post("/upload", upload.single("gallery_image"), async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "Image is required" });
    const gallery_image = req.file;
    imageNames.push(gallery_image.filename);

    res.status(201).json({ message: "Image uploaded successfully" });
});

//get images api
router.get("/", (req, res) => {
    if (!imageNames.length)
        return res.status(200).json({ message: "Noo images uploaded", imageNameList: imageNames });
    res.status(200).json({ images: imageNames });
});

module.exports = router;
