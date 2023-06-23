import { client } from '../../client';
import { protectResolver } from '../../users/users.utils';

export default {
    Query: {
        seeRoom: protectResolver(async (_, {id}, {logginUser}) => {
            try {                

                const returnResult = await client.room.findFirst({
                    where:{
                        id,
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