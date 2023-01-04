const multer = require("multer");
const path = require("path");
const fs = require('fs');

let storage = multer.diskStorage({
    destination: (req, res, cb) =>{
        const dir = "./uploads";
        const exist = fs.existsSync(dir);
        if (!exist) {
           return fs.mkdir(dir, error => cb(error, dir));
        }
        return cb(null, dir);
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
})

uploadFileOnUploadsFolder = async (req, res, next) => {
	multer({
		storage: storage
	}).any()(req, res, (err) => {
		if (err && err.message) return res.status(400).json({ status: 400, message: err.message }); //only for file too lage
		next();
	});
};
module.exports = {
    uploadFileOnUploadsFolder
};