const mongoose=require('mongoose');
const {Schema}=mongoose;

const userSchema=new Schema({
 fullName:{
    type:String,
    required:true,
    minLength:3,
    maxLength:25
 },
 emailId:{
    type:String,
    required:true,
    unique:true,
    trim:true,
    lowercase:true,
    immutable:true
 },age:{
    type:Number,
    min:8,
    max:99
 },role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },password:{
    required:true,
    type:String
  }   
},{
    timestamps:true
})
const User = mongoose.model('user', userSchema);
module.exports = User;