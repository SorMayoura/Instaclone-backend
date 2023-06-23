import { client } from '../../client';
import { protectResolver } from '../../users/users.utils';

export default {
    // Query: {}
    Mutation: {
        toggleLike: protectResolver(
            async (_, { id }, { logginUser }) => {
                try {

                    const checkPhoto = await client.photo.findUnique({ where: { id } });
                    if (!checkPhoto) {
                        return {
                            status: false,
                            message: "Photo not found."
                        }
                    };

                    const likeWhere = {
                        user_Id: logginUser.id,
                        photo_Id: id

                    };

                    let returnResult = null;
                    const isLike = await client.like.findFirst({
                        where: likeWhere
                    });

                    if (isLike) {
                        await client.like.delete({
                            where: {
                                user_Id_photo_Id: {
                                    user_Id: logginUser.id,
                                    photo_Id: checkPhoto.id
                                }
                            }
                        })
                    } else {
                        returnResult = await client.like.create({
                            data: {
                                photo: {
                                    connect: { id: checkPhoto.id }
                                },
                                user: {
                                    connect: { id: logginUser.id }
                                },
                            }, include:{
                                photo: true,
                                user: true
                            }
                        })
                    };

                    return {
                        status: true,
                        message: 'You liked this photo.',
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
        )
    }
}