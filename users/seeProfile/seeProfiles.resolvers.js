import { client } from "../../client";

export default {
    Query: {
        seeProfile: async (_, {userName}) => {
            try {
                const returnResult = await client.User.findUnique({
                    where: {userName},
                    include: {
                        following: true,
                        follower: true,
                        photos:true
                    }
                });

                if (returnResult.length == 0) {
                    return {
                        status: false,
                        message: "This user is not found."
                    }
                }
                return {
                    status: true,
                    message: "success",
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
        },

        allProfile: async () => {
            try {
               
                const returnResult = await client.User.findMany(
                    {
                        include: {
                            following: true,
                            follower: true
                        }
                    }
                );
                return {
                    status: true,
                    message: "success",
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
    },
};

