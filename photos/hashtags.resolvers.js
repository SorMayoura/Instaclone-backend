import { client } from "../client";

export default {
    Photo: {
        user_ref: ({user_Id}) => {
            return client.user.findUnique({where:{id:user_Id}});
        },
        hashtags: ({id}) => {
            return client.hashtag.findMany({
                where:{
                    photos: {
                        some: {id}
                    }
                }
            })
        },
        likes: ({id}) => {
            return client.like.count({
                where:{
                    photo_Id:id
                }
            })
        }
    }
}