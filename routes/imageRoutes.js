const express = require('express');
const router = express.Router();
const { getImage, uploadImage } = require('../controllers/imageController')

router.get('/:fileName', getImage);
router.post("/", uploadImage);

module.exports = router;