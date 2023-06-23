import { client } from '../client';

export default {
    Room: {
        users: ({id}) => client.room.findUnique({where:{id}}).users(),
        messages:({id})=>  client.message.findMany({where:{roomId:id}}),
        unreadTotal: ({id}, _, {logginUser}) => {
            if (!logginUser) {
                return 0
            }
            return client.message.count({
                where:{
                    read:false,
                    roomId: id,
                    user:{
                        id:{
                            not: logginUser.id
                        }
                    }
                }
            })
        }
    },
    Message: {
        user: ({id}) => client.message.findUnique({
            where:{
                id
            }
        }).user()
    }
}