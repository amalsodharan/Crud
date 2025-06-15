const initDb = require('../db');
const jwt = require('jsonwebtoken');

const addTask =  async (req, res) => {
    const { Tasks } = await initDb()
    const { task_name, time_required, description, from_time, to_time } = req.body
    try {
          const input = { user_id: '6bf20b73-d9bf-4e39-a54f-a5bd80759bbb', task_name, time_required, description, from_time, to_time, status: 0, is_deleted: 0 }
          const addItem = await Tasks.create(input)
          res.status(201).json(addItem)
    } catch {
         res.status(400).json({ message: 'Error fetching data!' })
    }
}

const viewTasks = async (req, res) => {
    const { Tasks } = await initDb()
    const { task_name, time_required, stock } = req.body
    try {
         const fetchTasks = await Tasks.findAll()
         if (fetchTasks == null) {
              return res.json({ message: 'No Tasks were Added to the Database' })
         }
         res.json(fetchTasks)
    } catch {
         res.status(400).json({ message: 'Error fetching data!' })
    }
}

const changeTask = async (req, res) => {
    const { Tasks } = await initDb()
    const { task_name, time_required, stock } = req.body
    try {
         const fetchItem = await Tasks.findOne({
              where: {
                   task_name: task_name
              }
         })
         if(fetchItem == null){
              return res.json({ message : `The task named ${task_name} was not found` })
         }
         const updateItem = await fetchItem.update({ time_required : time_required, stock : stock })
         res.status(201).json({ message : 'Updated Successfully', responce : updateItem })
    } catch {
         res.status(400).json({ message: 'Error updating data!' })
    }
}

module.exports = {
    addTask,
    viewTasks,
    changeTask,
};