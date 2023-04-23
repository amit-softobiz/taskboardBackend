// const mongoose = require('mongoose');
const Task = require('../models/taskModel');

const addTask = async (req, res) => {
    const task = new Task({
        title: req.body.title,
        status: "Active",
        description: req.body.description,
        date: new Date()
    });
    await task.save();
    res.send(task);
}
const getTask = async (req, res) => {
    try {
        const data = await Task.find();
        res.send(data);
    } catch (error) {
        res.send("some error");
    }
}
const getTaskByCategory = async (req, res) => {
    const status = req.params.status;
    console.log("status", status);
    try {
        const data = await Task.find({ status: status });
        res.send(data);
    } catch (error) {
        res.send("some error");
    }
}
const updateTaskById = async (req, res) => {
    const id = req.params.id;
    const title = req.body.title;
    const status = req.body.status;
    const description = req.body.description;
    try {
        const data = await Task.findByIdAndUpdate({ "_id": id }, {
            "title": title,
            "status": status,
            "description": description,
            "date": new Date()
        });
        if (data) return res.send(data);
        else { return res.send("problem") }
    } catch (Error) {
        res.send(Error);
    }
}

const deleteTaskById = async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Task.findByIdAndDelete({ "_id": id });
        res.send("data deleted");
    } catch (error) {
        res.send("some error");
    }
}

const deleteMultipleTaskBycategory = async (req, res) => {
    const statuss = req.params.status;
    console.log("statuss", statuss);
    try {
        const data = await Task.deleteMany({ status: statuss });
        res.send("data deleted by status");
    } catch (error) {
        res.send(error);
    }
}

module.exports = {
    addTask,
    getTask,
    getTaskByCategory,
    updateTaskById,
    deleteTaskById,
    deleteMultipleTaskBycategory
}