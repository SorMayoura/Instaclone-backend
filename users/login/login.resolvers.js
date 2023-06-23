import { client } from "../../client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export default {
    Mutation: {
        login: async (_, {userName, password}) => {
            try {
                // check user name
                const existingProfile = await client.User.findUnique({
                    where: { userName }
                });
    
                if (!existingProfile) {
                    return {
                        status: false,
                        message: "User name not found."
                    }
                }

                const comparePassword = bcrypt.compareSync(password, existingProfile.password);
                
                if (comparePassword) {

                    const jwt_token = jwt.sign({id:existingProfile.id}, process.env.SECRET_KEY);
                    return {
                        status: true,
                        message: "success",
                        token: jwt_token
                    }    
                } else {
                    return {
                        status: false,
                        message: "Wrong password."
                    }
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