import express from 'express';
import { Task } from '../models/taskModel.js';

const router = express.Router();

// Route for creating a new task
router.post('/', async (request, response) => {
    try {
        const { title, description, assignedTo, status } = request.body;

        const newTask = await Task.create({
            title,
            description,
            assignedTo,
            status
        });

        return response.status(201).json(newTask);
    } catch (error) {
        console.error(error.message);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route for getting all tasks
router.get('/', async (request, response) => {
    try {
        const tasks = await Task.find({});
        return response.status(200).json(tasks);
    } catch (error) {
        console.error(error.message);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route for getting a task by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const task = await Task.findById(id);
        if (!task) {
            return response.status(404).json({ message: 'Task not found' });
        }
        return response.status(200).json(task);
    } catch (error) {
        console.error(error.message);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route for updating a task
router.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const updatedTask = await Task.findByIdAndUpdate(id, request.body, { new: true });
        if (!updatedTask) {
            return response.status(404).json({ message: 'Task not found' });
        }
        return response.status(200).json(updatedTask);
    } catch (error) {
        console.error(error.message);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
});

// Route for deleting a task
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return response.status(404).json({ message: 'Task not found' });
        }
        return response.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error.message);
        return response.status(500).json({ message: 'Internal Server Error' });
    }
});

export default router;