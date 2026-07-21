import mongoose, {Schema, Model} from "mongoose";


interface IUser{
    name: string;
    email : string;
    password: string;
    createdAt:Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    { 
    name:{
    type:String,
    required: true,
    minlength: 3,
    },

    email: {
        type: String,
        required:true,
        unique:true,
    },

    password:{
        type: String,
        required:true,
        
    },
   
 },
  {
    timestamps: true,
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
