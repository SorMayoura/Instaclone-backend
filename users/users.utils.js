import jwt from "jsonwebtoken";
import client from "../client"

const getUser = async (token) => {
    if (!token) return null;    

    const {id} = await jwt.verify(token, process.env.SECRET_KEY);
        
    const loggedUser = await client.users.findUnique({
        where: {id}
    })

    if (!loggedUser) return null
    else return loggedUser;
}

export default getUser;