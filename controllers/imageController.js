
//method: GET
//NO AUTH
const getImage = (req, res) => {
  console.log(req.params);
  res.sendFile(`/uploads/${req.params.fileName}`, { root: "./" });
};

//Method: POST
// NO AUTH
const uploadImage = (req, res, next) => {
  try {
    console.log(
      `upload request recieved /api/images file: ${req.file.originalname}`
    );
    res.json({
      file_url: `http://192.168.0.57:5000/uploads/${req.file.filename}`,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = { getImage, uploadImage };
