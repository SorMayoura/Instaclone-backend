import { client } from "../../client"

export default {
    Query: {
        seeFollowers: async (_, { userName, page }) => {
            try {
                const followers = await client.User.findMany({
                    take: 5,
                    skip:(page-1) * 5,
                    where: { 
                        following: {
                            some: {
                                userName
                            }
                        }
                    }
                });

                if (followers.length == 0) {
                    return {
                        status: false,
                        message: "User not found.",
                    }
                }

                const totalRecord = await client.User.count({
                    where: { 
                        following: {
                            some: {
                                userName
                            }
                        }
                    }
                });

                return {
                    status: true,
                    message: "success",
                    data: followers,
                    totalPages: Math.ceil(totalRecord / 5)
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