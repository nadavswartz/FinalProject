const bookService = require('../services/book');
const User = require('../models/Books');

//register function - gets all the values and redirect to /login
exports.addBook = async (req, res) => {
    try {
        const { Book_Name, Author, Year, Quantity, Category, Description, Image} = req.body;
        await bookService.addBook(Book_Name, Author, Year, Quantity, Categosry, Description, Image);
        console.log( `${Book_Name} Created now`) // for me to see that a user register propartly
        res.redirect('/Books');
    } catch (error) {
        res.status(500).json({ errors: [error.message] });
    }
};

