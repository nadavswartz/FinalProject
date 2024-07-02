const bookService = require('../services/book');
const Books = require('../models/Books');

//register function - gets all the values and redirect to /books
exports.addBook = async (req, res) => {
    try {
        const { Book_Name, Author, Year, Quantity, Category, Description, Image,} = req.body;
        await bookService.addBook(Book_Name, Author, Year, Quantity, Category, Description, Image);
        res.redirect('/Books');
    } catch (error) {
        res.status(500).json({ errors: [error.message] });
    }
};

// Controller function to fetch books and render bookspage
exports.renderBookPage = async (req, res) => {
    try {
        const Book_Name = req.params.Book_Name;
        const book = await Books.findOne({ Book_Name: Book_Name });
        if (!book) {
            return res.render('bookpage', { book: null });
        }
        res.render('bookpage', { book });
    } catch (err) {
        console.error('Error fetching book:', err);
        res.status(500).send('Error fetching book');
    }
};

exports.renderHomePage = async (req, res) => {
    try {
        const fantasyBooks = await Books.find({Category: 'Fantasy'});

        res.render('home', {fantasyBooks});
    } catch (err) {
        console.error('error fetching boosk:', err);
        resizeTo.status(500).send('Error fetching books');
    }
}