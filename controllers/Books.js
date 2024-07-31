const bookService = require('../services/book');
const Books = require('../models/Books');
const Order = require('../models/orders'); 
const { render } = require('ejs');
const { postTweet, generateTweetContent } = require('../services/twitterService');

exports.addBook = async (req, res, next) => {
    try {
      const { Book_Name, Author, Year, Quantity, Category, Description, Image, Price } = req.body;
      const newBook = await bookService.addBook(Book_Name, Author, Year, Quantity, Category, Description, Image, Price);
      const tweetContent = generateTweetContent(Book_Name, Author, Year, Category, Description, Image);
      await postTweet(tweetContent);
      res.redirect('/books');
    } catch (error) {
      next(error);
    }
  };

  
exports.renderBookPage = async (req, res, next) => {
    try {
        const Book_Name = req.params.Book_Name;
        const book = await Books.findOne({ Book_Name: Book_Name });
        if (!book) {
            const err = new Error('Book not found');
            err.status = 404;
            return next(err);
        }

        const exchangeRate = await bookService.getILSExchangeRate();
        
        res.render('bookpage', { book, exchangeRate });
    } catch (error) {
        next(error);
    }
};

exports.renderHomePage = async (req, res) => {
    try {
        const fantasyBooks = await Books.find({ Category: 'Fantasy' });
        const horrorBooks = await Books.find({ Category: 'horror' });
        const fictionBooks = await Books.find({ Category: 'Fiction' });
        const romanceBooks = await Books.find({ Category: 'romance' });

        res.render('home', { fantasyBooks, horrorBooks, fictionBooks, romanceBooks });
    } catch (err) {
        console.error('Error fetching books:', err);
        res.status(500).send('Error fetching books');
    }
};

exports.renderAllBooks = async (req, res) => {
    try {
        const section = req.query.section;
        const page = parseInt(req.query.page) || 1;
        const limit = 15;
        const skip = (page - 1) * limit;

        let matchQuery = {};
        if (section === "fantasy") {
            matchQuery = { Category: 'Fantasy' };
        } else if (section === "fiction") {
            matchQuery = { Category: 'Fiction' };
        } else if (section === "horror") {
            matchQuery = { Category: 'horror' };
        } else if (section === "romance") {
            matchQuery = { Category: 'romance' };
        } 

        const aggregateQuery = [
            { $match: matchQuery },
            { $group: {
                _id: "$Book_Name",
                Book_Name: { $first: "$Book_Name" },
                Image: { $first: "$Image" },
                Category: { $first: "$Category" },
            }},
            { $skip: skip },
            { $limit: limit }
        ];

        const totalBooksQuery = [
            { $match: matchQuery },
            { $group: { _id: "$Book_Name" } },
            { $count: "totalBooks" }
        ];

        const [allbooks, totalBooksResult] = await Promise.all([
            Books.aggregate(aggregateQuery),
            Books.aggregate(totalBooksQuery)
        ]);

        const totalBooks = totalBooksResult[0] ? totalBooksResult[0].totalBooks : 0;
        const totalPages = Math.ceil(totalBooks / limit);

        res.render('AllBooks', { allbooks, totalPages, currentPage: page, section });
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

exports.processPayment = async (req, res, next) => {
    const { name, cardNumber, expiryDate, cvv } = req.body;
    const cartItems = req.session.cart || [];
    const userId = req.session.userId; // Assuming you have user info in session

    if (!bookService.validateFormData(name, cardNumber, expiryDate, cvv)) {
        res.status(400).send('Invalid form data');
        return;
    }

    try {
        await bookService.processPayment(cartItems);

        const order = new Order({
            Total_Price: cartItems.reduce((total, item) => total + (item.book.Price * item.quantity), 0),
            User: userId,
            Order_Books: cartItems.map(item => ({
                book: item.book._id,
                quantity: item.quantity
            }))
        });

        await order.save();

        req.session.cart = []; // Clear the cart after successful order

        res.render('approved');
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).send('Server Error');
    }
};

exports.renderOrderHistory = async (req, res, next) => {
    const userId = req.session.userId;

    try {
        const orders = await Order.find({ User: userId }).populate('Order_Books.book');
        res.render('orders', { orders });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.deleteBook = async (req, res) => {
    try {
        const { Book_Name } = req.body;
        await bookService.deletebook(Book_Name);
        res.redirect('/books/delete');
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: [error.message] });
    }
};

exports.updateBook = async (req, res, next) => {
  try {
      const { Book_Name, Author, Year, Quantity, Category, Description, Image, Price } = req.body;
      const updatedBook = await bookService.updateBook(Book_Name, { Author, Year, Quantity, Category, Description, Image, Price });
      if (!updatedBook) {
          res.status(404).send('Book not found');
          return;
      }
      res.redirect('/books/update');
  } catch (error) {
      next(error);
  }
};

