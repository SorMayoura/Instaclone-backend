import { client } from "../../client"
import { uploadToS3 } from "../../shared/shared.utils";
import { protectResolver } from "../../users/users.utils";

const resolverFunction = async (_, { file, caption }, { logginUser }) => {
    try {

        let hashtagObj = undefined;

        if (caption) {

            const getHashtags = caption.match(/#[\w-]+/g);

            if (getHashtags) {
                hashtagObj = getHashtags.map((item) => ({
                    where: { hashtag: item },
                    create: { hashtag: item }
                }));
            }

        };

        const fileURL = await uploadToS3(file, logginUser.id, "uploads");

        const returnResult = await client.Photo.create({
            data: {
                file:fileURL,
                caption,
                hashtags: {
                    connectOrCreate: hashtagObj
                },
                user_ref: {
                    connect: {
                        id: logginUser.id
                    }
                },
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
        client.$disconnect()
    }
};

export default {
    Mutation: {
        uploadPhoto: protectResolver(resolverFunction)
    }
}