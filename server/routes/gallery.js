//modules
const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadImage");

router.post("/upload", upload.single("gallery_image"), (req, res) => {
    // const { imageName } = req.body;
    const gallery_image = req.file;
    console.log(gallery_image);
    // console.log(imageName);
    res.json({ message: "hi" });
});

module.exports = router;
