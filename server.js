const express = require('express');
const mariadb = require('mariadb');
const authenticateToken = require('./middleware/authenticateToken');
const Auth = require('./Auth');
const initDb = require('./db.js');
require('dotenv').config();
const { newUser, userLogin, userList } = require('./Controllers/userController');
const { addTask, viewTasks, changeTask } = require('./Controllers/taskController');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
     await initDb();
     res.send('this is the sample')
});

//User Section
app.post('/rest/signUp', newUser);

app.post('/rest/login', userLogin);

app.get('/rest/list', authenticateToken, Auth('admin'), userList);

//Task Section
app.post('/rest/user/add', addTask);
// app.post('/rest/user/add', authenticateToken, addTask);

app.get('/rest/user/view/', viewTasks);

app.put('/rest/user/change', authenticateToken, changeTask);

app.listen(port, () => {
     console.log(`server is running on ${port}`);
});