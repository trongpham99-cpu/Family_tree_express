const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const TaskSchema = new Schema({
    title: { type: String, required: true },
    children: [{ type: Types.ObjectId, ref: 'tasks', default: [] }],
    parentId: { type: Types.ObjectId, ref: 'tasks', default: null },
}, { timestamps: true });

const TaskModel = mongoose.model('tasks', TaskSchema);
module.exports = TaskModel;
