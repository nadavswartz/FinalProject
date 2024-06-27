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
        // Fetch the first book from the database
        const book = await Books.findOne(); // Assuming you want to display the first book found
        console.log(book.Book_Name);
        if (!book) {
            return res.render('bookpage', { book: null }); // Render with null if no book found
        }
        res.render('bookpage', { book }); // Render the bookpage.ejs template with the retrieved book data
    } catch (err) {
        console.error('Error fetching book:', err);
        res.status(500).send('Error fetching book');
    }
}

