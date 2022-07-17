
//method: GET
//NO AUTH
const getImage = (req, res) => {
  console.log(req.params);
  res.sendFile(`/uploads/${req.params.fileName}`, { root: "./app" });
};

//Method: POST
// NO AUTH
const uploadImage = (req, res, next) => {
  try {
    console.log(
      `upload request recieved /api/images file: ${req.file.originalname}`
    );
    res.json({
      file_url: `https://mhimageuploader.herokuapp.com/uploads/${req.file.filename}`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getImage, uploadImage };
