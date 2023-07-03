import { client } from '../../client';
import { protectResolver } from '../users.utils';

export default {
    Query: {
        me: protectResolver(
           async (_, __, {logginUser}) => {
                try {        
                    
                    const dataResult = await client.User.findUnique({
                        where:{id:logginUser.id}
                    });
                    
                    return {
                        status: true,
                        message: 'success',
                        data: dataResult
                    }
                    
                } catch (error) {
                    return {
                        status: false,
                        message: error.message
                    }
                } finally {
                    client.$disconnect();
                }
            }
        ) 
    }
}