import { client } from "../../client"
import { protectResolver } from "../users.utils";

const resolverFunction = async (_, {userName}, {logginUser}) => {
    try {

        const ok = await client.User.findUnique({ where: { userName } });
        if (!ok) {
          return {
            status: false,
            message: "That user does not exist.",
          };
        }

        await client.User.update({
            where: {id: logginUser.id}, 
            data: {
                following: {
                    connect: 
                        {userName}
                    
                }
            }
        });        

        return {
            status: true,
            message: `You have followed ${userName}.`            
        }
    } catch (error) {
        return {
            status: false,
            message: error.message               
        }
    } 
    finally {
        client.$disconnect()
    }
    
};

export default {
    Mutation: {
        following: protectResolver(resolverFunction)
    }
}