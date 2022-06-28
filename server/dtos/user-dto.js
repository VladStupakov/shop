export default class UserDto{
    email;
    id;
    role;

    constructor(user){
        this.email = user.email
        this.id = user._id
        this.role = user.role
    }
}