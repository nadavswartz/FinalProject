const bookService = require('../services/book');
const Books = require('../models/Books');

exports.addBook = async (req, res) => {
    try {
        const { Book_Name, Author, Year, Quantity, Category, Description, Image, Price } = req.body;
    
        await bookService.addBook(Book_Name, Author, Year, Quantity, Category, Description, Image, Price);
        res.redirect('/books');
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [error.message] });
    }
};

exports.renderBookPage = async (req, res) => {
    try {
        const Book_Name = req.params.Book_Name;
        const book = await Books.findOne({ Book_Name: Book_Name });
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

exports.renderCartPage = (req, res) => {
    const cartItems = req.session.cart || [];
    console.log(cartItems)
    const totalPrice = cartItems.reduce((total, item) => total + (item.book.Price * item.quantity), 0);
    console.log(totalPrice)
    res.render('cart', { cartItems, totalPrice });
};


exports.addToCart = async (req, res) => {
    const { bookId } = req.body;
    try {
      const book = await getBookDetails(bookId);
      if (!req.session.cart) {
        req.session.cart = [];
      }
  
      const existingItem = req.session.cart.find(item => item.book._id.toString() === bookId);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        req.session.cart.push({ book, quantity: 1 });
      }
  
      res.json({ success: true });
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ success: false, message: 'Failed to add book to cart' });
    }
  };
  
  const getBookDetails = async (bookId) => {
    try {
      const book = await Books.findById(bookId);
      if (!book) {
        throw new Error('Book not found');
      }
      return book;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  