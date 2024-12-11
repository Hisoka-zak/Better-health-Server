import mongoose from "mongoose";

const mySchema = mongoose.Schema({
    mealsID:Number,
    calories:Number,
    Mname:String,
    price:String,
    imgUrl:String,
})

const MealsModel = mongoose.model("meals_records",mySchema)

export default MealsModel;
