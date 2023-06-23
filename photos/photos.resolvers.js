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
        comments: ({ id }) => client.comment.count({ where: { photoId: id } }),
        isMine: ({user_Id}, _, {logginUser}) => {
            if (!logginUser) {
                return false
            } else {
                return user_Id == logginUser.id;
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