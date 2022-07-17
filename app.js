const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");
require("dotenv/config");
const port = process.env.PORT || 5000;


const app = express();

//multer configuration
const imageStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        const error = file.mimetype.split('/')[0]==='image'
        ? null
        : new Error('Invalid File type');
        cb(error, './uploads/')
    },
    filename: (req, file, cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `${uniqueSuffix}${file.originalname}`)
    }
})
const upload = multer({storage: imageStorage})



//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Controll-Allow-Credentials", true);
  next();
});
//getImage
app.use("/uploads", require("./routes/imageRoutes"));
//uploadImage
app.use(
  "/api/images",
  upload.single("files[]"),
  require("./routes/imageRoutes")
);
//


app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
