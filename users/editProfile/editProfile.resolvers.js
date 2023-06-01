import client from "../../client";
import bcrypt from "bcryptjs";
import { protectResolver } from "../users.utils";

const resolverFunction = async (_, {
    firstName,
    LastName,
    userName,
    email,
    password: newPassword,
}, {loggedUser}) => {

    let uglyPassword = null;
    if (newPassword) {
        uglyPassword = await bcrypt.hashSync(newPassword, 8);
    }

    const editOk = await client.users.update({
        where: {id: loggedUser.id},
        data: {
            firstName,
            LastName,
            userName,
            email,
            ...(uglyPassword && {password: uglyPassword}),
        }
    });

    if (editOk.id) {
        return { editOk: true }
    } else return { editOk: false, message: "Could NOT Update this Profiile", }
};

export default {
    
    Mutation: {                        
        editUser: protectResolver(resolverFunction)
    }
}
