//modules
const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "public", "images");

const fetchImages = (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) return res.status(400).json({ message: err.message });

        if (!files.length)
            return res.status(200).json({
                message: "Image folder is empty, please upload some images",
                images: files,
            });

        const baseURL = `${req.protocol}://${req.get("host")}/images/`;
        // const imageFullPath = files?.map((file) => {
        //     return baseURL + file;
        // });
        const imageFullPath = files?.map((file) => {
            return file;
        });

        if (req.method === "POST")
            return res
                .status(200)
                .json({ message: "Image uploaded Successfully", images: imageFullPath });

        res.status(200).json({ images: imageFullPath });
    });
};

module.exports = { fetchImages };
