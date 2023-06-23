import { client } from "../../client";
import bcrypt from "bcryptjs";
import { protectResolver } from "../users.utils";
import {uploadToS3} from "../../shared/shared.utils"

const resolverFunction = async (_, {            
    userName,
    firstName,
    LastName,
    password,
    email,
    // following User? @relation(references: [User.follower])
    // follower User? @relation( references: [User.following])
    avarta, 
    bio
}, {logginUser}) => {
    try {
        
        const newPassword = password ? bcrypt.hashSync(password, 10) : undefined;        
        let avartaUrl = '';

        if (avarta) {
            /* the comment section is how to upload the photo file to project folder */

            // // get the image property from avatar on createReadStream promise 
            // const {filename, createReadStream} = await avarta.promise;

            // // get the stream from createReadStream of avarta
            // const stream = createReadStream();

            // // new file name to save 
            // const newFilename = logginUser.id + '_' + Date.now() + '_' + filename;
            // // write file to our project folder 
            // const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);

            // stream.pipe(writeStream);

            // avartaUrl = 'http://localhost:8000/static/' + newFilename;    

            avartaUrl = await uploadToS3(avarta, logginUser.id, "avatars");
        }
        
        const returnResult = await client.User.update({
            where:{id:logginUser.id},
            data:{
                userName,
                firstName,
                LastName,
                password: newPassword,
                email,
                ...(avarta && {avarta: avartaUrl}),
                bio
            }
        })
        return {
            status: true,
            message: "success",
            data: returnResult
        }
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    } finally {
        client.$disconnect();
    }
}

export default {
    Mutation: {
        editProfile: protectResolver(resolverFunction)
    },
    // Upload: GraphQLUpload,
}