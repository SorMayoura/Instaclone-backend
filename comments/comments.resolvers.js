
export default {
    Comment: {
        isMine: ({userId}, _, {logginUser}) => {
            if (!logginUser) {
                return false
            } else {
                return userId == logginUser.id;
            }
        }
    }
    
}