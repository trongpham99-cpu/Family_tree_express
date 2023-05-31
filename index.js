const express = require('express');
const app = express();
const port = 3000;
const TaskModel = require('./models/task.model');
const { Types } = require('mongoose');
app.use(express.json());
//init database
require('./dbs/mongo.dbs');


app.get('/', (req, res) => {
    return res.status(200).json({
        message: "Hello world"
    });
})

app.get('/tasks/get-family-tree/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const task = await TaskModel.findById(id).populate('children');
        return res.status(200).json({
            message: "Get family tree successfully",
            statusCode: 200,
            data: task
        });
    } catch (error) {
        return res.status(500).json({
            message: "Get family tree failed",
            statusCode: 500,
            error: error.message
        });
    }
});

app.get('/tasks/v2/get-family-tree/:id', async (req, res) => {
    const { id } = req.params;
    try {

        const task = await TaskModel.aggregate([
            { $match: { _id: new Types.ObjectId(id) } },
            {
                $graphLookup: {
                    from: "tasks",
                    startWith: "$_id",
                    connectFromField: "_id",
                    connectToField: "parentId",
                    as: "children",
                    maxDepth: 100,
                    depthField: "level",
                },
            }
        ])
        return res.status(200).json({
            message: "Get family tree successfully",
            statusCode: 200,
            data: task
        });
    } catch (error) {
        return res.status(500).json({
            message: "Get family tree failed",
            statusCode: 500,
            error: error.message
        });
    }
});

app.get('/tasks/get-all', async (req, res) => {
    try {
        const tasks = await TaskModel.find();
        return res.status(200).json({
            statusCode: 200,
            message: "Get all tasks successfully",
            data: tasks
        });
    } catch (error) {
        return res.status(500).json({
            message: 500,
            error: error.message
        });
    }
})

app.post('/tasks', async (req, res) => {
    const { task } = req.body;
    try {
        //create task
        const newTask = await TaskModel.create(task);
        //update task
        const { parentId } = task;
        if (parentId) {
            const updateTask = await TaskModel.findByIdAndUpdate(
                parentId,
                {
                    $push: {
                        children: newTask._id
                    }
                },
                {
                    new: true
                }
            )
        }
        return res.status(201).json({
            message: "Create task successfully",
            statusCode: 201,
            data: newTask
        });
    } catch (error) {
        return res.status(500).json({
            message: "Create task failed",
            statusCode: 500,
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})

