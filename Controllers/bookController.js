const initDb = require('../db');
const jwt = require('jsonwebtoken');

const addBook =  async (req, res) => {
    const { Books } = await initDb()
    const { book_name, price, stock } = req.body
    try {
         const fetchItem = await Books.findOne({
              where: {
                   book_name: book_name
              }
         })
         if (fetchItem == null) {
              const addItem = await Books.create({ book_name, price, stock })
              res.status(201).json(addItem)
         } else {
              res.status(404).json({ message: `Book already exist` })
         }
    } catch {
         res.status(400).json({ message: 'Error fetching data!' })
    }
}

const viewBooks = async (req, res) => {
    const { Books } = await initDb()
    const { book_name, price, stock } = req.body
    try {
         const fetchBooks = await Books.findAll()
         if (fetchBooks == null) {
              return res.json({ message: 'No Books were Added to the Database' })
         }
         res.json(fetchBooks)
    } catch {
         res.status(400).json({ message: 'Error fetching data!' })
    }
}

const changeBook = async (req, res) => {
    const { Books } = await initDb()
    const { book_name, price, stock } = req.body
    try {
         const fetchItem = await Books.findOne({
              where: {
                   book_name: book_name
              }
         })
         if(fetchItem == null){
              return res.json({ message : `The book named ${book_name} was not found` })
         }
         const updateItem = await fetchItem.update({ price : price, stock : stock })
         res.status(201).json({ message : 'Updated Successfully', responce : updateItem })
    } catch {
         res.status(400).json({ message: 'Error updating data!' })
    }
}

module.exports = {
    addBook,
    viewBooks,
    changeBook,
};