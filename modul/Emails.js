import mongoose from "mongoose";

const mySchema = mongoose.Schema({
    email:String,
    feedback:String,
})

const EmailModel = mongoose.model("emails_records",mySchema)

export default EmailModel;