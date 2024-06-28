const bookService = require('../services/book');
const Books = require('../models/Books');

//register function - gets all the values and redirect to /books
exports.addBook = async (req, res) => {
    try {
        const { Book_Name, Author, Year, Quantity, Category, Description, Image} = req.body;
        await bookService.addBook(Book_Name, Author, Year, Quantity, Category, Description, Image);
        res.redirect('/Books');
    } catch (error) {
        res.status(500).json({ errors: [error.message] });
    }
};

// Controller function to fetch books and render bookspage
exports.renderBookPage = async (req, res) => {
        try {
            // for now it's just make random book
            const randomSkip = Math.floor(Math.random()* 150 ) +1;
            const books = await Books.find().skip(randomSkip).limit(1);
            if (books.length === 0) {
                return res.render('bookpage', { book: null });
            }
            const book = books[0];
            console.log(book.Book_Name)
            res.render('bookpage', { book });
        } catch (err) {
            console.error('Error fetching book:', err);
            res.status(500).send('Error fetching book');
        }
    }

