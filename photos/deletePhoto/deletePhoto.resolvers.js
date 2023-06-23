import { client } from '../../client';
import { protectResolver } from '../../users/users.utils';

export default {
    Mutation: {
        deletePhoto: protectResolver( async (_, {id}, {logginUser}) => {
            try {

                const checkPhoto = await client.photo.findUnique({where:{id}});
                if (!checkPhoto) {
                    return{
                        status: false,
                        message: "Photo Not Found"
                    }
                } else if (checkPhoto.user_Id !== logginUser.id) {
                    return{
                        status: false,
                        message: "Not authorized"
                    }
                }
                return {
                    status: true,
                    message: 'success',
                    data: await client.photo.delete({where:{id}})
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