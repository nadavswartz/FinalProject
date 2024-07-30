const Books = require('../models/Books');
const fetch = require('node-fetch');


exports.getILSExchangeRate = async () => {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD?access_key=7cc07cd554-cd8d6308ad-sg9cfv');
    const data = await response.json();
    return data.rates.ILS;
};
exports.updateBook = async (Book_Name, newBookData) => {
    const bookToUpdate = await Books.findOne({ Book_Name });
    if (!bookToUpdate) {
        return new Error('Book not found');
    } 
    for (let key in newBookData) {
        if (newBookData.hasOwnProperty(key)) {
            bookToUpdate[key] = newBookData[key];
        }
    }
    await bookToUpdate.save();
    console.log(bookToUpdate);
}

exports.addBook = async (Book_Name, Author, Year, Quantity, Category, Description, Image, Price) => {
    try {
        const newBook = new Books({ Book_Name, Author, Year, Quantity, Category, Description, Image, Price });
        const savedBook = await newBook.save();
        console.log('Book saved:', savedBook);
        return savedBook;
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
};

exports.processPayment = async (cartItems) => {
    for (let item of cartItems) {
        if (!item.book) {
            console.error('Item does not have a book property:', item);
            continue;
        }
        const book = await Books.findById(item.book._id);
        Books.Quantity -= item.Quantity;
        await book.save();
    }
};

exports.validateFormData = (name, cardNumber, expiryDate, cvv) => {
    if (!name || !cardNumber || !expiryDate || !cvv) {
        return false;
    }
    return true;
};

exports.deletebook = async (Book_Name) => {
    try {
        const bookToDelete = Books.findOne({Book_Name})
        await bookToDelete .deleteOne();
    } catch (error) {
        console.error('Error delete book:', error);
        throw error;
    }
};