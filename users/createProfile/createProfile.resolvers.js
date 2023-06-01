import client from "../../client";
const bcrypt = require('bcryptjs');

export default {
    Mutation: {
        createUser: async (_, {firstName, LastName, email, password, userName}) => {

            try {
                // check duplicated email or username
                const isEmailOrUsernameExisted = await client.users.findFirst({
                    where : {
                        // email
                        OR: [{email}, {userName}]
                    }

                });
                if (isEmailOrUsernameExisted) {
                    console.log({success:false, message:"Email/User Name has been used."})
                    return;                 
                }

                // harse the password to secure password data
                const harshPassword = await bcrypt.hashSync(password, 8);
               
                return client.users.create({data: {firstName, LastName, email, password: harshPassword, userName}});                     
            } catch (error) {
                console.log(error)
            }                        
        }
    }
}