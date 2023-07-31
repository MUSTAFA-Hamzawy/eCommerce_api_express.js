// Importing required modules
const express = require('express');
const connectDB = require('./config/connectDB');
const ErrorHandlerMiddleware = require('./middlewares/ErrorHandlerMiddleware');
const status = require('./helpers/statusCodes');

// Import route files
const userRoutes = require('./routes/user');
const brandRoutes = require('./routes/brand');
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/category');
const cartRoutes = require('./routes/cart');
const searchRoutes = require('./routes/search');

// Loading env file
require('dotenv').config();

const app = express();

// Listening for any request, if connected to db successfully
const PORT = process.env.PORT || 3005;
if(connectDB()){
    console.log('connected to db.');

    // Listening for any request, if connected to db successfully
    app.listen(PORT, ()=>{
        console.log(`Server is running on port : ${PORT}`);
    })
}

app.use(express.json()) // Built-in Middleware To parse any request body



/***************************   Routes  *************************************/
app.use('/user', userRoutes);
app.use('/brand', brandRoutes);
app.use('/category', categoryRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use('/search', searchRoutes);




/***************************   Middlewares  *************************************/
app.use(ErrorHandlerMiddleware);


// Fallback route for any non-existing requested routes.
app.all('*', (req, res)=>{
    res.status(status.NOT_FOUND);
    throw new Error("Not found route.");
});



