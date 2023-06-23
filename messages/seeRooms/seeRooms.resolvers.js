import { client } from '../../client';
import { protectResolver } from '../../users/users.utils';

export default {
    Query: {
        seeRooms: protectResolver(async (_, __, {logginUser}) => {
            try {          
                const returnResult = await client.room.findMany({
                    where:{
                        users:{
                            some: {id:logginUser.id}
                        }
                    }
                });

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