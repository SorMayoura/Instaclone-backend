import { client } from "../client";

export default {
    User: {
        totalFollowing: (root) => {
            const totalFollowingResult = root["following"].length;
            return totalFollowingResult;
        },
        totalFollower: (root) => {
            const totalFollowerResult = root["follower"].length;
            return totalFollowerResult;
        },
        isFollowing: async ({ id }, _, { logginUser }) => {
            if (!logginUser) {
                return false;
            }

            const following = await client.User.findUnique({
                where: {id}                
            }).follower({
                where:{
                    id: logginUser.id
                }
            });
            return following.length == 0 ? false : true;
        },
        isMe: ({ id }, _, { logginUser }) => {
            if (!logginUser) {
                return false;
            }
            return id === logginUser.id;
        }
    }
}