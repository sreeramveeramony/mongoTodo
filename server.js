const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

app.use(express.static("forntend"));
app.use(express.json());

const Task = require("./model/schema");

mongoose.connect("mongodb+srv://Sreeram:Sreeram%400477@kingslayer.vrb1q3c.mongodb.net/mydb");

// serve Vue frontend
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "forntend", "vue.html"));
});

// add task
app.post("/task", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

// get tasks
app.get("/task", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// delete task
app.delete("/task/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.send("Deleted");
});

// update task (toggle complete)
app.put("/task/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
