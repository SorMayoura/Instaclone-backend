import { withFilter } from 'graphql-subscriptions';
import { NEW_MESSAGE } from '../constants';
import { pubsub } from '../pubsub';
import { client } from '../client';

export default {
    Subscription: {
        roomUpdates: {
            subscribe: async (root, args, context, info) => {

                // inside here it's working after listening

                return withFilter(
                    () => pubsub.asyncIterator(NEW_MESSAGE),
                    async ({ roomUpdates }, { id }) => {
                        // inside here it's working after listening
                        const room = await client.room.findFirst({
                            where: {
                                id,
                                users: {
                                    some: {
                                        id: context.logginUser.id
                                    }
                                }
                            },
                            select: {
                                id: true
                            }
                        })

                        if (!room) {
                            return {
                                status: false,
                                message: "You shall no see this message"
                            }
                        } else {
                            return roomUpdates.roomId == id;

                        }
                    }
                )(root, args, context, info);
            }
        }
    }
}