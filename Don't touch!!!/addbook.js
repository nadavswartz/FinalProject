const mongoose = require('mongoose');
const Book = require('../models/Books');
const booksData = require('./dbinsert.json');

async function insertBooks() {
    try {
        await mongoose.connect("mongodb+srv://nadavb246:8i9gHONrBUIdWxzm@project1.pbgzyrq.mongodb.net", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        const insertResult = await Book.insertMany(booksData);
        console.log('Books inserted successfully:', insertResult.length);

    } catch (err) {
        console.error('Error inserting books:', err);
    } finally {
        mongoose.disconnect();
    }
}
insertBooks();
