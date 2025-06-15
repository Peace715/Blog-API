const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');


app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

app.get('/', (req, res) => {
    res.send("Blog API is running");
});

module.exports = app;