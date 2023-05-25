//modules
const express = require("express");
const cors = require("cors");

const galleryRoute = require("./routes/gallery");

const app = express();
const PORT = 5005;

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/gallery/", galleryRoute);

app.listen(PORT, () => console.log(`Server is running on Port:${PORT}`));
