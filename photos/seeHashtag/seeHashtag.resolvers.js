import { client } from "../../client"

export default {
    Query: {
        seeHashtag: async (_, {hashtag}) => {
            try {
                const returnResult = await client.Hashtag.findUnique({where:{hashtag}});

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
    }
}