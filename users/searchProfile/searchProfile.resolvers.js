import { client } from "../../client"

export default {
    Query: {
        searchProfile: async (_, {keyword}) => {
            try {
                
                let returnMessage = "success";
                let searchProfileResult = null;

                if (keyword) {
                    searchProfileResult = await client.User.findMany({
                        where:{
                            userName:{
                                startsWith: keyword,
                                mode: 'insensitive',                     
                            }
                        }
                    });  
                    
                    returnMessage = searchProfileResult.length > 0 ? "success" : "No record.";
                } else {
                    returnMessage = "Please input keyword."
                }
               
                return {
                    status: true,
                    message: returnMessage,
                    data: searchProfileResult
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