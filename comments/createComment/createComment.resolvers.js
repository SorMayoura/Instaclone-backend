import { client } from '../../client';
import { protectResolver } from '../../users/users.utils';

export default {
    Mutation: {
        createComment: protectResolver(async (_, { photoId, payload }, { logginUser }) => {
            try {
                const checkPhoto = await client.photo.count({ where: { id: photoId } });
                if (checkPhoto <= 0) {
                    return {
                        status: false,
                        message: 'Photo not found.',
                    }
                }
                const returnResult = await client.comment.create({
                    data: {
                        payload,
                        photo: {
                            connect: {
                                id: photoId
                            }
                        },
                        user: {
                            connect: {
                                id: logginUser.id
                            }
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
        })
    }
}