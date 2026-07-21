import User from "@/models/User";
import {connectDB} from "@/lib/mongodb";


export async function findUserByEmail(email:string){
    await connectDB();
    return User.findOne({email});

}
export async function createUser(data:{
    name:string;
    email:string;
    password:string;
}) {
    await connectDB();
    return User.create(data);
}