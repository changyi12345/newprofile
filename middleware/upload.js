const multer = require('multer');
const path = require('path');

// Use Memory Storage for Firebase Upload
const storage = multer.memoryStorage();

// Check file type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif|pdf/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    } else {
        cb('Error: Images/PDF Only!');
    }
}

// Init upload
const upload = multer({
    storage: storage,
    limits:{fileSize: 10000000}, // 10MB limit
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
});

module.exports = upload;
