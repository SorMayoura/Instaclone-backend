import { client } from "../client";

export default {
    Photo: {
        user_ref: ({ user_Id }) => {
            return client.user.findUnique({ where: { id: user_Id } });
        },
        hashtags: ({ id }) => {
            return client.hashtag.findMany({
                where: {
                    photos: {
                        some: { id }
                    }
                }
            })
        },
        likes: ({ id }) => client.like.count({ where: { photo_Id: id } }),
        commentNumber: ({ id }) => client.comment.count({ where: { photoId: id } }),
        comments: ({id}) => client.photo.findUnique({where:{id}}).comments({include:{user:true}}),
        isMine: ({user_Id}, _, {logginUser}) => {
            if (!logginUser) {
                return false
            } else {
                return user_Id == logginUser.id;
            }
        },
        isLiked: async ({id}, _, {logginUser}) => {
            if (!logginUser) {
                return false
            } else {
                const ok = await client.like.findUnique({
                    where: {
                        user_Id_photo_Id: {
                            user_Id:logginUser.id,
                            photo_Id: id
                        }
                    },
                    select: {
                        id: true
                    }
                });

                if (ok) {
                    return true
                } else {
                    return false
                }
            }
        }
    },

    Hashtag: {
        photos: ({ id }, { page }) => {
            return client.Photo.findMany({
                take: 5,
                skip: 5 * (page - 1),
                where: {
                    hashtags: {
                        some: { id }
                    }
                }
            })
        },
        totalPhoto: ({ id }) => {
            return client.Photo.count({
                where: {
                    hashtags: {
                        some: { id }
                    }
                }
            })
        }
    }
}