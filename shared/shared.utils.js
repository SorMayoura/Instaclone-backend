import AWS from "aws-sdk";

AWS.config.update({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_ACCESS
    },
});

export const uploadToS3 = async (file, userId, folderName) => {
    try {        

        const { filename, createReadStream } = await file.promise;
        const objName = folderName +  "/" + userId + '_' + Date.now() + '_' + filename;
        const readStream = createReadStream();

        const upload = await new AWS.S3().upload({
            Bucket: "bodywell-instaclone",
            Key: objName,
            ACL: 'public-read',
            Body: readStream,
        }).promise();

        return upload.Location;
    } catch (error) {
        return error.message
    }

}