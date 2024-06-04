require('dotenv').config({ path: 'config/.env.local' });

// all the requires
const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const userRoutes = require('./routes/routes');
const cors = require('cors');

// connect to the DB
const init = async () => {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });


    const app = express();
    app.use(express.static('public'));
    
    app.use(cors());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
      }));
    
    app.set('view engine', 'ejs');
    app.set('views', __dirname + '/views');
    
    app.use(userRoutes);
    
    // listen function for the web port 
    const port = process.env.PORT || 3000;
    return app.listen(port, () => {
        console.log(`Server is running on port ${port} all set-up`);
    });
};

// starts all
init();
