const multer = require('multer');

const upload = multer({
}).array('images', 10);

module.exports = upload;
