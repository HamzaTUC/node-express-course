const asyncWrapper = require("../middleware/async");
const Task = require("../models/Task");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks: tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
    // these were before costumError Class
    // const error = Error("Not found");
    // error.status = 404;
    // return next(error);
    // return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }
  res.status(200).json(task);
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
    // this was before costum Error class
    //return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }
  res.status(200).json({ id: taskID, data: req.body });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
    //this was before cosum Error class
    // return res.status(404).json({ msg: `No task with id: ${taskID}` });
  }
  res.status(200).json(task);
});

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
