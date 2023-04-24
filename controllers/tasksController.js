const Task = require("../models/taskModel");

const addTask = async (req, res) => {
  const task = new Task({
    title: req.body.title,
    status: "Active",
    description: req.body.description,
    date: new Date(),
  });
  await task.save();
  res.send(task);
};
const getTask = async (req, res) => {
  try {
    const data = await Task.find();
    if (data.length === 0) {
      res.send("The list is empty...");
    } else {
      res.send(data);
    }
  } catch (error) {
    res.send(error);
  }
};
const getTaskByStatus = async (req, res) => {
  const status = req.params.status;
  try {
    if (
      status !== "Active" &&
      status !== "Inprogress" &&
      status !== "Completed"
    ) {
      return res.send(
        "Please enter the correct status you can have this options [Active,Inprogress,Completed]"
      );
    }
    const data = await Task.find({ status: status });
    if (data.length === 0) {
      res.send("The list is empty for this status...");
    } else {
      res.send(data);
    }
  } catch (error) {
    res.send(error);
  }
};
const updateTaskById = async (req, res) => {
  const id = req.params.id;
  const title = req.body.title;
  const status = req.body.status;
  const description = req.body.description;
  try {
    const data = await Task.findByIdAndUpdate(
      { _id: id },
      {
        title: title,
        status: status,
        description: description,
        date: new Date(),
      }
    );
    if (data) return res.send("data is updated...");
    else {
      return res.send(
        `data is not updated due to that id ${id} is not present`
      );
    }
  } catch (Error) {
    res.send(Error);
  }
};

const deleteTaskById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Task.findByIdAndDelete({ _id: id });
    if (data !== null) {
      res.send(`data deleted by this id ${id}`);
    } else {
      res.send(`${id} id is not present...`);
    }
  } catch (error) {
    res.send(error);
  }
};

const deleteMultipleTaskBycategory = async (req, res) => {
  const statuss = req.params.status;
  try {
    if (
      statuss !== "Active" &&
      statuss !== "Inprogress" &&
      statuss !== "Completed"
    ) {
      return res.send(
        "Please enter the correct status you can have this options [Active,Inprogress,Completed]"
      );
    }
    const data = await Task.deleteMany({ status: statuss });
    if (data.deletedCount !== 0) {
      res.send(`data deleted by status the ${statuss}`);
    } else if (data.deletedCount === 0) {
      res.send("data is not preset so we can not delete it");
    } else {
      res.send(`${statuss} is not present...`);
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  addTask,
  getTask,
  getTaskByStatus,
  updateTaskById,
  deleteTaskById,
  deleteMultipleTaskBycategory,
};
