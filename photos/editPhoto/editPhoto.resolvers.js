import { client } from '../../client';

export default {
    Query: {
        searchPhoto: async (_, {caption, page}) => {
            try {
                const returnResult = await client.Photo.findMany({
                    take: 5,
                    skip: 5 * (page - 1),
                    where:{
                        caption:{
                            startsWith: caption
                        }
                    }
                });

                return {
                    status: true,
                    message: 'success',
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
    },

    Mutation: {
        editPhoto: async (_, {id, caption}) => {
            try {

                const checkPhoto = await client.Photo.findUnique({
                    where:{id},
                    include: {
                        hashtags: true
                    }
                });
                if (!checkPhoto) {
                    return {
                        status: false,
                        message: 'No photo found.'
                    }
                }

                // find old hashtags and disconnenct them from the photo
                const oldPhotoHashtag = checkPhoto.hashtags.map((hashtag) => ({hashtag: hashtag.hashtag}));

                // find new hashtags and connect to the photo
                let newHashtageObj = undefined;
                if (caption) {

                    const getHashtags = caption.match(/#[\w-]+/g);

                    if (getHashtags) {
                        newHashtageObj = getHashtags.map((item) => ({
                            where: { hashtag: item },
                            create: { hashtag: item }
                        }));   
                    }
                };

                const returnResult = await client.Photo.update({
                    where:{id},
                    data:{
                        caption,
                        hashtags:{
                            disconnect: oldPhotoHashtag,
                            connectOrCreate: newHashtageObj
                        }
                    }
                });
                return {
                    status: true,
                    message: 'success',
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
    }

 
}