const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./models/Todo.model');

const PORT = 3001;
const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/test')

app.post('/add', (req, res) => {
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
        .catch(err => res.json(err))
})

app.get('/getListItem', (req, res) => {
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findOneAndUpdate({_id: id}, {done: true})
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    TodoModel.findOneAndDelete({_id: id})
        .then(result => res.json(result))
        .catch(err => res.json(err))
})

app.listen(PORT, () => {
    console.log("server is running on " + PORT);
})