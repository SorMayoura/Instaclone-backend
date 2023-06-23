import { client } from "../../client";
import { protectResolver } from "../users.utils";

const unfollowFunction = async (_, {userName}, {logginUser}) => {
    try {

        // check existing user
        const existingUser = await client.User.findUnique({
            where: {userName}
        });

        if (!existingUser) {
            return {
                status: false,
                message: "Not existing user."
            }
        }

        // check if you have followed this user
        const ifFollow = await client.User.findFirst({
            where: {
                AND: {                    
                        following: {
                            some: {
                                userName
                            }
                        },                    
                        id: logginUser.id                    
                }                
            }
        });

        if (!ifFollow) {
            return {
                status: false,
                message: `You have not followed ${userName}`
            }
        }

        //  unfollow this user
        await client.User.update({
            where: { id: logginUser.id },
            data: {
                following: {
                    disconnect: { userName }
                }
            }            
        });
        return {
            status: true,
            message: `You have unfollowed ${userName}`
        }
    } catch (error) {
        return {
            status: false,
            message: error.message
        }
    } finally {
        client.$disconnect()
    }
}

export default {
    Mutation: {
        unfollow: protectResolver(unfollowFunction)
    }
}