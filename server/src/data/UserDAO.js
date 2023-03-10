import User from "../model/User.js"

class UserDAO {
    async createUser({ email, name, password_hash }) {
         const user = await User.create({
            email,
            name,
            password_hash
        });
        console.log("User created: ", user);

        return user;
      }

     async dropAll() { 
        await User.deleteMany({});
     }

    async findUserByEmail(email) {
        const user = await User.findOne({ email:email }); 
        return user;
    }

}

export default UserDAO;
