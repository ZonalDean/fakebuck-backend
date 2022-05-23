require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan')


// MIDDLEWARE IMPORT
const notFoundMiddleware = require('./middlwares/NotFound');
const errorMiddleware = require('./middlwares/Error');
const { forceDB } = require('./Sync');

const app = express();
app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// MIDDLEWARE
app.use(notFoundMiddleware);
app.use(errorMiddleware);

// forceDB()

const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`Server running on port: ${port}`)
})