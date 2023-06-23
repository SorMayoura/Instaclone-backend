import { client } from "../../client"

export default {
    Query: {
        seeFollowings: async (_, { userName, lastID }) => {
            try {
                const followings = await client.User.findUnique({
                    where:{userName}
                }).following({
                    take: 5,
                    skip: lastID ? 1 : 0,
                    ...(lastID && {cursor: {id: lastID}}),
                });

                // return error
                if (!followings) {
                    return {
                        status: false,
                        message: "User not found.",
                    }
                } else if (followings.length == 0) {
                    return {
                        status: false,
                        message: "No more record.",
                    }           
                }

                return {
                    status: true,
                    message: "success",
                    data: followings
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
    }
}