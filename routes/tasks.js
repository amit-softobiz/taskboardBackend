var express = require('express');
const taskController = require('../controllers/tasksController');
var router = express.Router();

/* GET users listing. */
router.post('/', taskController.addTask);
router.get('/', taskController.getTask);
router.put('/:id', taskController.updateTaskById);
router.delete('/:id', taskController.deleteTaskById);
router.get('/:status', taskController.getTaskByCategory);
router.delete('/status/:status', taskController.deleteMultipleTaskBycategory);


module.exports = router;
