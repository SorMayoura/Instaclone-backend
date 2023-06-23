import { client } from '../../client';
import { protectResolver } from '../../users/users.utils';

export default {
    Mutation: {
        deleteComment: protectResolver( async (_, {id}, {logginUser}) => {
            try {
                const checkComment = await client.comment.findUnique({where:{id}});
                if (!checkComment) {
                    return{
                        status: false,
                        message: "Comment Not Found"
                    }
                } else if (checkComment.userId !== logginUser.id) {
                    return{
                        status: false,
                        message: "Not authorized"
                    }
                }

                return {
                    status: true,
                    message: 'success',
                    data: await client.comment.delete({where:{id}})
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