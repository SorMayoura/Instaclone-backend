import { client } from "../../client"

export default {
    Query: {
        seePhoto: async (_, {id}) => {
            try {
                const returnResult = await client.Photo.findUnique({where:{id}});

                console.log(returnResult);
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