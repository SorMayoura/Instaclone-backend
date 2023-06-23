import jwt from "jsonwebtoken";
import { client } from "../client";

export const getUser = async (reqToken) => {
    try {
        let id = jwt.verify(reqToken, process.env.SECRET_KEY).id;
        const loggedinUser = await client.User.findUnique({
            where:{id}
        });
        
        return loggedinUser ? loggedinUser : null;
    } catch (error) {
        return null;
    }
    
}

export const protectResolver = (ourResolver) => (root, args, context, info) => {

    if (!context.logginUser) {
        return {
            status: false,
            message: "Please login to perform this action. ^^"
        }
    } 
    return ourResolver(root, args, context, info);
}