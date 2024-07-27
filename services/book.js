const Books = require('../models/Books');
const fetch = require('node-fetch');


exports.getILSExchangeRate = async () => {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD?access_key=7cc07cd554-cd8d6308ad-sg9cfv');
    const data = await response.json();
    return data.rates.ILS;
};

exports.addBook = async (Book_Name, Author, Year, Quantity, Category, Description, Image, Price) => {
    try {
        const newBook = new Books({ Book_Name, Author, Year, Quantity, Category, Description, Image, Price });
        await newBook.save();
        console.log(newBook);
    } catch (error) {
        console.error('Error adding book:', error);
        throw error;
    }
};

