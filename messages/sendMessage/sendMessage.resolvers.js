import { client } from '../../client';
import { NEW_MESSAGE } from '../../constants';
import { pubsub } from '../../pubsub';
import { protectResolver } from '../../users/users.utils';

export default {
    Mutation: {
        sendMessage: protectResolver(async (_, {userId, payload, roomId}, {logginUser}) => {
            try {

                // check if user exist 
                const checkUser = await client.user.findFirst({
                    where:{id:userId},
                    select:{
                        id:true
                    }
                });

                if (!checkUser) {
                    return {
                        status: false,
                        message: 'User not found.',
                    }
                }
                
                let room = undefined;
                if (!roomId) {
                    // create room if roomId isn't provided
                    room = await client.room.create({
                        data:{
                            users:{
                                connect:[
                                    { id: userId },
                                    { id: logginUser.id }
                                ]
                            }
                        }
                    })                    
                } else if (roomId) {

                    // check if provided roomId is valid
                    room = await client.room.findUnique({
                        where:{
                            id: roomId
                        },
                        select:{
                            id: true
                        }
                    });

                    if (!room) {
                        return {
                            status: false,
                            message: 'Room not found.',
                        }
                    }
                };
                
                const returnResult = await client.message.create({
                    data:{
                        payload,
                        user:{
                            connect:{
                                id: logginUser.id
                            }
                        },
                        room: {
                            connect:{
                                id:room.id
                            }
                        }    
                    }
                });
                
                pubsub.publish(NEW_MESSAGE, {roomUpdates: {...returnResult}})
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