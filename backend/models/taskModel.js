import mongoose from 'mongoose';

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        assignedTo: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'in_progress', 'completed'], // Define possible status values
            default: 'pending', // Set default status
            required: true,
        },
    },
    {
        timestamps: true
    }
);

export const Task = mongoose.model('Cat', taskSchema); 