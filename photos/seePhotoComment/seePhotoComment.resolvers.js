import { client } from '../../client';

export default {
    Query: {
        seePhotoComment: async (_, {photoId}) => {
            try {
                // const returnResult = null;
                return {
                    status: true,
                    message: 'success',
                    data: await client.comment.findMany({
                        where:{photoId},
                        orderBy:{
                            createdAt: "asc"
                        }
                    })
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