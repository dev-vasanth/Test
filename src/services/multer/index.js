import multer from 'multer';
import path from 'path';

const documentStorage = multer.diskStorage({
    destination: path.join(__dirname, '../../../assets/profiles'),
    filename: function (req, file, callback) {
        callback(null, Date.now() + '_' + file.originalname);
    }
});


const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    } else {
        callback(null, false);
    }
};

export const uploadProfiles = multer({
    storage: documentStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

