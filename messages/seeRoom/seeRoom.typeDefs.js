import { gql } from 'apollo-server-express';

export default gql`
    type seeRoomResult {
        status: Boolean,
        message: String,
        data: Room
    }
    type Query {
        seeRoom(id:Int!): seeRoomResult
    }
`