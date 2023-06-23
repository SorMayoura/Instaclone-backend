import { client } from '../../client';

export default {
    Query: {
        seePhotoLike: async (_, {photoId}) => {
            try {
                const foundPhoto = await client.like.findMany({
                    where:{
                        photo_Id:photoId
                    },
                    select: {
                        user: true
                    }
                });

                let returnResult = null;
                if (foundPhoto.length > 0) {
                    returnResult = foundPhoto.map((item) => (item.user));
                }

                console.log(returnResult);
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