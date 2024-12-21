const initDb = require('../db');
const jwt = require('jsonwebtoken');

const newUser = async (req, res) => {
    const { Users } = await initDb()
    const { role, name, email } = req.body
    try {
         const newItem = await Users.create({ role, name, email })
         const token = jwt.sign(
              { id: newItem.id, role: newItem.role, name: newItem.name, email: newItem.email },
              process.env.JWT_SECRET,
              { expiresIn: '12hr' }
         );

         res.status(201).json({ newItem: newItem, token: `JWT ${token}` })
    } catch (err){
         console.error(err)
         res.status(400).json({ message: 'Error creating new user!' })
    }
}

const userLogin = async (req, res) => {
    const { Users } = await initDb()
    const { id } = req.user; 
    try {
         const fetchUser = await Users.findOne({
              where: {
                   id: id
              }
         })
         if (!fetchUser) {
              return res.json({ message: 'No such user in the database' })
         }
         res.json({ message : 'login Succesfull!', user : fetchUser})
    } catch {
         res.status(400).json({ message: 'Error fetching data!' })
    }
}

const userList =  async (req, res) => {
    const { Users } = await initDb()
    const allUser = await Users.findAll()
    if (allUser === null) {
         return res.json({ message: 'No user exist in the database' })
    }
    res.json(allUser)
}

module.exports = {
     newUser,
     userLogin,
     userList,
};