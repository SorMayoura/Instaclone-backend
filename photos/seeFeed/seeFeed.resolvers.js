import { client } from '../../client';
import { protectResolver } from '../../users/users.utils';

export default {
    Query: {
        seeFeed: protectResolver(async (_, __, {logginUser}) => {
            try {
                const returnResult = await client.photo.findMany({
                    where:{
                        OR: [
                            {user_Id: logginUser.id},
                            {user_ref:{
                                follower:{
                                    some: {
                                        id: logginUser.id
                                    }
                                }
                            }}
                        ]
                    },
                    orderBy: {
                        createdAt: "desc"
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