const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config();


const port = process.env.PORT || 5000;
const DB_URI = process.env.MONGO_URI;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => 
        console.log(`Server is running on port ${port}`));
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

