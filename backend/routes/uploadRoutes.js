const express = require('express')
const multer = require('multer')
const path = require('path')
const router = express.Router()
const app = express()
const fs = require('fs')
const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null;
        }
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            asset_folder: "scv-app",
            resource_type: "auto",

        })
        //file has been uploaded successfully
        //console.log('File Uploaded Successfully', response);
        //console.log(response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath);//remove the locally saved temp file as the upload operations got failed
        return null;
    }
}



const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`)
    }
})

//initialize upload 
const upload = multer({
    storage,
    fileFilter
}).single('file')

//check file type
function fileFilter(req, file, cb) {
    //Allowed extensions
    const fileTypes = /jpe?g|png|webp/;
    //const mimetypes = /image\/jpe?g|image\png|image\/webp/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error('Images Only!'), false)
    }


}

router.post('/', (req, res) => {

    upload(req, res, async function (err) {
        if (err) {
            res.status(400).send({ message: err });
        } else {
            if (req.file === undefined) {
                res.status(400).send({ message: 'No file selected!' });
            } else {
                const fileUpload = await uploadOnCloudinary(req.file.path)
                if (fileUpload) {
                    fs.unlinkSync(req.file.path);
                    res.status(200).send({
                        message: 'File uploaded sucessfully',
                        file: fileUpload.url
                    });
                } else {
                    res.status(400).send({ message: 'Error uploading file' });
                }

            }
        }
    })
})

module.exports = router;