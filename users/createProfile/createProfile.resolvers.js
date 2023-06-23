import { client } from "../../client";
import bcrypt from "bcryptjs";

export default {
    Mutation: {
        createProfile: async (_, {userName, firstName, LastName, password, email, avarta, bio}) => {
            
            try {
                const existingProfile = await client.User.findFirst({
                    where:{
                        OR: [
                            {
                                userName: {
                                    contains:userName
                                }
                            },
                            {
                                email: {
                                    contains:email
                                }
                            }
                        ]
                    } 
                })
    
                if (existingProfile) {
                    return {
                        status: false,
                        message: "Username or email is existed. Please try again."
                    }
                }
    
                const hashPassword = bcrypt.hashSync(password, 10);

                const returnResult = await client.User.create({
                    data: {
                        userName, firstName, LastName, password:hashPassword, email, avarta, bio
                    }
                });
                    
                return {
                    status: true,
                    message: "success",
                    data: [returnResult]
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