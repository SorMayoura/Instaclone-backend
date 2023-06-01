import client from "../../client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
    Mutation: {
        login: async (_, {userName, password}) => {

            // get the record with the given userName
            const loginUser = await client.users.findFirst({
                where: {userName}
            });
            
            // return error message when no  record found
            if (!loginUser) {
                return {
                    loginOk: false,
                    message: "user not found",
                }
            }

            // verify password
            const loginSuccess = await bcrypt.compareSync(password, loginUser.password);
            
            // return login message
            if (!loginSuccess) {
                return {
                    loginOk: false,
                    message: "Password is not correct!",
                }
            }

            // generate token with jwt after successfully verified
            const tokenStr = jwt.sign({id: loginUser.id}, process.env.SECRET_KEY);
            return {
                loginOk: true,
                token: tokenStr
            }

        }
    }
}