import { client } from '../../client';
import { protectResolver } from '../../users/users.utils';

export default {
    Mutation: {
        readMessage: protectResolver( async (_, {id}, {logginUser}) => {
            try {
                const returnResult = await client.message.findFirst({
                    where:{
                        id,
                        userId: {
                            not: logginUser.id
                        },
                        room: {
                            users:{
                                some:{
                                    id: logginUser.id
                                }
                            }
                        }
                    },
                    select:{
                        id:true
                    }
                });

                if(!returnResult){
                    return{
                        status: false,
                        message: "Message not found."
                    }
                }

                await client.message.update({
                    where:{id},
                    data:{
                        read: true
                    }
                })
                return {
                    status: true,
                    message: 'success',
                    data: returnResult
                }
            } catch (error) {
                return {
                    status: false,
                    message: error.message
                }
            } finally {
                client.$disconnect();
            }
        })
    }
}