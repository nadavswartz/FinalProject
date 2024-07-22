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
        console.log('Book Name:', Book_Name);
        if (!book) {
            return res.render('bookpage', { book: null });
        }

        const exchangeRate = await bookService.getILSExchangeRate();
        
        res.render('bookpage', { book, exchangeRate });
    } catch (err) {
        console.error('Error fetching book:', err);
        res.status(500).send('Error uploading book');
    }
};

exports.renderHomePage = async (req, res) => {
    try {
        const fantasyBooks = await Books.find({ Category: 'Fantasy' });
        const horrorBooks = await Books.find({ Category: 'horror' });
        const fictionBooks = await Books.find({ Category: 'Fiction' });

        res.render('home', { fantasyBooks, horrorBooks, fictionBooks });
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).send('Error fetching books');
    }
};

exports.renderAllBooks = async (req, res) => {
    try {
        const section = req.query.section;
        const page = parseInt(req.query.page) || 1;
        const limit = 10; // 10 books per page (2 rows of 5 books)
        const skip = (page - 1) * limit;

        let query = {};
        if (section === "fantasy") {
            query = { Category: 'Fantasy' };
        } else if (section === "fiction") {
            query = { Category: 'Fiction' };
        } else if (section === "horror") {
            query = { Category: 'horror' };
        }

        const allbooks = await Books.find(query).skip(skip).limit(limit);
        const totalBooks = await Books.countDocuments(query);
        const totalPages = Math.ceil(totalBooks / limit);

        res.render('AllBooks', { allbooks, totalPages, currentPage: page, section });
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).send('Error fetching books');
    }
};
