import { client } from '../../client';
import { protectResolver } from '../../users/users.utils';

export default {
    Query: {
        seeFeed: protectResolver(async (_, {offset}, {logginUser}) => {
            try {
                const returnResult = await client.photo.findMany({
                    take:2,
                    skip: offset,
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

                return returnResult;
                // return {
                //     status: true,
                //     message: 'success',
                //     data: returnResult
                // }
            } catch (error) {
                // return {
                //     status: false,
                //     message: error.message
                // }
                console.log(error.message);
            } finally {
                client.$disconnect();
            }
        })
    }
}