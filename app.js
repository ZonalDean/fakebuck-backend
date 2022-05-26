require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')

// SHORTCUTS
const { modDB } = require('./Sync');

// MIDDLEWARE IMPORT
const authenticate = require('./middlwares/Authenticate')
const notFoundMiddleware = require('./middlwares/NotFound');
const errorMiddleware = require('./middlwares/Error');

// ROUTE IMPORT
const authRoute = require('./routes/authRoute')
const userRoute = require('./routes/usersRoute')
const friendRoute = require('./routes/friendRoute')
const postRouter = require('./routes/postRoute');


// BASICS
const app = express();
app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//ROUTE 
app.use('/auth', authRoute)
app.use('/users', authenticate, userRoute)
app.use('/friends', authenticate, friendRoute)
app.use('/posts', authenticate, postRouter);


// MIDDLEWARE
app.use(notFoundMiddleware);
app.use(errorMiddleware);


// modDB()

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})