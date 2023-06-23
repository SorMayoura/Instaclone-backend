import { gql } from 'apollo-server-express';

export default gql`
    type seeRoomsResult {
        status: Boolean,
        message: String,
        data: [Room]
    }
    type Query {
        seeRooms: seeRoomsResult
    },
`