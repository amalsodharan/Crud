const express = require('express');
const mariadb = require('mariadb');
const authenticateToken = require('./middleware/authenticateToken');
const Auth = require('./Auth');
require('dotenv').config();
const { newUser, userLogin, userList } = require('./Controllers/userController');
const { addBook, viewBooks, changeBook } = require('./Controllers/bookController');
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get('/', async (req, res) => {
     await initDb();
     res.send('this is the sample')
});

//User Section
app.post('/rest/signUp', newUser);

app.post('/rest/login', authenticateToken, userLogin);

app.get('/rest/list', authenticateToken, Auth('admin'), userList);

//Books Section
app.post('/rest/user/add', authenticateToken, Auth('admin'), addBook);

app.get('/rest/user/view/', viewBooks);

app.put('/rest/user/change', authenticateToken, Auth('admin'), changeBook);

app.listen(port, () => {
     console.log(`server is running on ${port}`);
});