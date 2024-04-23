
export default class UserModel{
    constructor(name, lastName, email, password){
        this.name = name;
        this.lastName= lastName
        this.email = email;
        this.password = password;
    }
    static signUp(name, lastName, email, password){
        try{
        const newUser = new UserModel(name,lastName, email, password)
        return newUser
        }catch(err){
            console.log(`error in signUp static function of userModel ${err}`)
        }
    }
} 
