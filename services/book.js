const Books = require('../models/Books');


const multer = require('multer');
const fs = require('fs');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const upload = multer({ storage: storage });

// Function to create a new book entry with an image
async function addBook(req, res) {
  const { Book_Name, Author, Year, Quantity, Category, Description } = req.body;

  let bookImage = null;
  if (req.file) {
    bookImage = {
      data: fs.readFileSync(req.file.path),
      contentType: req.file.mimetype,
    };
  }
  const newBook = new Books({
    Book_Name,
    Author,
    Year,
    Quantity,
    Category,
    Description,
    Image: bookImage,
  });

  try {
    await newBook.save();
    res.status(201).send('Book added successfully');
  } catch (err) {
    console.error('Error saving book:', err);
    res.status(500).send('Error saving book');
  }
}

module.exports = { addBook, upload };
