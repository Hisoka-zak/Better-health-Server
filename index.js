import mongoose from "mongoose";
import cors from 'cors';
import express from 'express';
import MealsModel from "./modul/Meals.js";
import EmailModel from "./modul/Emails.js";

//instantiate
const myApp = express();

//use packages
myApp.use(express.json());
myApp.use(cors());

//connect to the DB
mongoose.connect("mongodb+srv://Admin:Admin123@cluster0.tz9iw0t.mongodb.net/MealsDB");

//Get Meals to Display
myApp.get("/getMeals",(req,res)=>{
    MealsModel.find()
    .then((Meals)=> res.json(Meals))
    .catch((err)=> console.log(res.json(err)) )
});

//Get Email to Display
myApp.get("/getEmail",(req,res)=>{
    EmailModel.find()
    .then((Email)=> res.json(Email))
    .catch((err)=> console.log(res.json(err)) )
});

//Add Meals
myApp.post("/AddMeals",async(req,res)=>{
const mealsID= req.body.mealsID;
const calories= req.body.calories;
const Mname= req.body.Mname;
const price= req.body.price;
const imgUrl= req.body.imgUrl;

const Meals= new MealsModel({ 
    mealsID:mealsID,
    calories:calories,
    Mname:Mname,
    price:price,
    imgUrl:imgUrl,
  });
  await Meals.save();
  })

//Add Email
myApp.post("/AddEmail",async(req,res)=>{
  const email= req.body.email;
  const feedback= req.body.feedback;
  
  const Email= new EmailModel({ 
    email:email,
    feedback:feedback,
  });
  await Email.save();
  })

//Delete Meals
myApp.delete("/deleteMeals/:id", (req, res) => {
      const id = req.params.id;
      MealsModel.findByIdAndDelete({_id: id})
      .then(res =>res.json(res))
      .catch (err => res.json(err)) 
    });

//Update Meals
myApp.get('/getMeals/:id',(req,res)=>{
      const id = req.params.id;
      MealsModel.findById({_id:id})
      .then(Meals=> res.json(Meals))
      .catch(err=>res.json(err))
    })

myApp.put('/UpdateMeals/:id',(req,res)=>{
  const id = req.params.id;
  MealsModel.findByIdAndUpdate({_id:id},{
        mealsID : req.body.mealsID,
        Mname : req.body.Mname,
        calories : req.body.calories,
        price : req.body.price,
        imgUrl : req.body.imgUrl
  })
  .then(res=> res.json(res))
  .catch(err=>res.json(err))
})
        
myApp.listen(8005, ()=>{ 
console.log("Server is Running...") });