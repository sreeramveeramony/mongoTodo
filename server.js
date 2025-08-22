const express=require("express");
const mongoose=require("mongoose");
const app=express();
app.use(express.static("forntend"));

const user=require("./model/schema");


app.use(express.json());
mongoose.connect("mongodb+srv://Sreeram:Sreeram%400477@kingslayer.vrb1q3c.mongodb.net/mydb");
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/forntend/index.html");
    res.send("HEllo");
});

app.post("/task",async(req,res)=>{
    const task=new user(req.body);
    await task.save();
    res.json(task);
})

app.get("/task",async(req,res)=>{
    const tasks=await user.find();
    res.json(tasks);
    
})
app.delete("/task/:id",async(req,res)=>{
    const id=req.params.id;
    await user.findByIdAndDelete(id);
    res.send("Deleted")
})
app.listen(3000,()=>{
    console.log("Listening to port 3000")
})