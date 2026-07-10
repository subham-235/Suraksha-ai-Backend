const mongoose=require('mongoose');
const {Schema}=mongoose;

const contactSchema=new Schema({
    contacts:{
        required:true,
        enum:["Family","Father","Mother","Brother","Sister","Local Police Station","Other Contacts"],
        default:"Family",
        type:String
    },profileId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },via:{
        required:true,
        enum:["WhatsApp","SMS"],
        default:['SMS']
    }, createdAt: {
    type: Date,
    default: Date.now
  },contactNumber:{
    type:String,
    trim:true,
    required:true
  }
})

const Contact=mongoose.model("contact",contactSchema);
module.export = Contact;