import mongoose from "mongoose";
import jwt from'jsonwebtoken'
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    image:{
        type:String,
       
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    },
},{timestamps:true})
userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
})
userSchema.methods.isPasswordCorrect =async function(password){
    return await bcrypt.compare(password,this.password)
}
userSchema.methods.generatetoken=function(){
    return jwt.sign({
        _id: this._id
    },process.env.JWT_SECRET,
{
    expiresIn:"30d"
});
}
 const User =mongoose.model("User",userSchema)
 export default User