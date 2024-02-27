const multer = require('multer');
const path = require('path');

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './img/product_images'); // already set folder public "admin" so discard adding public in path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '_' + file.originalname);
  },
});

const uploadImage = multer({
  storage: fileStorage,
  limits: { fileSize: '10000000' },
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb('Error: Image uploaded does not match the required format.');
  },
}).single('product_img');

module.exports = uploadImage;
