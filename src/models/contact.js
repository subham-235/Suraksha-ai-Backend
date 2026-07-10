const mongoose=require('mongoose');
const {Schema}=mongoose;

const contactSchema=new Schema({
    contacts:{
        required:true,
        enum:["Father","Mother","Brother","Sister","Local Police Station","Other Contacts"],
        type:String
    }
})