const router = require("express").Router();
require('dotenv').config();

//s3
const aws = require('aws-sdk')
const Busboy = require('busboy');
const AWSAccessKeyId =  process.env.AWSAccessKeyId
const AWSSecretKey =  process.env.AWSSecretKey
const AWSRegion = process.env.AWSRegion

const s3 = new aws.S3({
    accessKeyId: AWSAccessKeyId,
    secretAccessKey: AWSSecretKey
})

const AWSBucket = process.env.AWSBucket;


const uploadFile = async(req, res) => {
    try {
        let file = req.body;
        let busboy = new Busboy({ headers: req.headers });
        aws.config.update({
            apiVersion: "2022-26-04",
            accessKeyId: AWSAccessKeyId,
            secretAccessKey: AWSSecretKey,
            region: AWSRegion
        })
        busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            fname = file.fileName.replace(/ /g, "_");
            ftype = file.type;
            fEncoding = file.blob;
        });
        busboy.on('finish', function() {
            var cleanBlob = file.blob.replace(/data:image\/webp;base64,/, '')
            .replace(/data:image\/webp;base64,/, '')
            .replace(/data:image\/png;base64,/, '')
            .replace(/data:image\/jpeg;base64,/, '')
            .replace(/data:video\/webm;base64,/, '')
            .replace(/data:video\/mp4;base64,/, '')

            var buf = new Buffer.from(cleanBlob, 'base64');
            const params = {
                    Bucket: AWSBucket,
                    Key: file.fileName,
                    Body: buf,
                    // ACL: 'public-read',
                    ContentType: file.type
                }
                //  sending buffer data to s3.
            s3.upload(params, (err, s3res) => {
                if (err) {
                    console.log("error in upload to s3");
                    return res.status(500).send("Error in upload to s3");
                } else {
                    res.send({ file: 'https://remember-app-assets.s3.amazonaws.com/' + s3res.Key, status: 'success', msg: 'Image successfully uploaded.' });
                }
            });

        });
        req.pipe(busboy);

    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};

const removeFile = async function(req, res) {
    try {
        let fileUrl = req.body.fileUrl;
        if(!fileUrl) throw new Error('There are no file');

        fileUrl = fileUrl.replace('https://remember-app-assets.s3.amazonaws.com/','');

        //  sending buffer data to s3.
        s3.deleteObject({
            Bucket: AWSBucket,
            Key:fileUrl
        },function (err,data){
            if (err) {
                console.log("error in delete from s3");
                console.log(err);
                return res.status(500).send("Error in delete from s3");
            } else {
                res.send({ status: 'success', msg: 'Image successfully daleted.' });
            }
        })
        return res.status(200);
    } catch (err) {
        return res.status(500).send("Internal Server Error");

    }
}

const removeFiles = async function(req, res) {
    try {

        let filesUrl = req.body;
        if(!filesUrl) throw new Error('There are no file');

        for (let index = 0; index < filesUrl.length; index++) {
            let fileUrl = filesUrl[index];
            filesUrl[index] = fileUrl.replace('https://remember-app-assets.s3.amazonaws.com/','');
        }

        const objects = filesUrl.map(key => ({ Key: key }));

        
        //  sending buffer data to s3.
        s3.deleteObjects({
            Bucket: AWSBucket,
            Delete: { Objects: objects },
        },function (err,data){
            if (err) {
                console.log("error in delete files from s3");
                console.log(err);
                return res.status(500).send("Error in delete files from s3");
            } else {
                res.send({ status: 'success', msg: 'Images successfully daleted.' });
            }
        })
        return res.status(200);
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");

    }
}


router.post('/', uploadFile)
router.post('/remove', removeFile)
router.post('/removeFiles', removeFiles)

module.exports = router;