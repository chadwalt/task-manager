const express = require("express");
const Task = require("../models/task");
const mongoose = require("../db/mongoose");

const router = new express.Router();

router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.send(tasks);
  } catch (error) {
    res.status(500).send();
  }
});

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    throw new Error("Invalid Task ID");
  }

  try {
    const task = await Task.findById(_id);

    if (!task) {
      return res.status(404).send();
    }

    return res.send(task);
  } catch (error) {
    return res.status(500).send();
  }
});

router.patch("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error("Invalid Task ID");
  }

  try {
    const task = await Task.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true
    });

    if (!task) {
      return res.status(404).send();
    }

    return res.send(task);
  } catch (error) {
    return res.status(400).send(error);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  const _id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    throw new Error("Invalid Task ID");
  }

  try {
    const task = await Task.findByIdAndDelete(_id);

    if (!task) {
      return res.status(404).send();
    }

    return res.send(task);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
