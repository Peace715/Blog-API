const Blog = require('../models/blog');
const calculateReadingTime = require('../utils/calculateReadingTime');

exports.createBlog = async (req, res) => {
    try {
        const { title, description, body, tags } = req.body;

        // Calculate reading time
        const readingTime = calculateReadingTime(body);

        const newBlog = new Blog({
            title,
            description,
            body,
            tags,
            author: req.user._id, // Assuming req.user is set by auth middleware
            reading_time: readingTime
        });

        const saved = await newBlog.save();
        res.status(201).json(saved);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getAllPublishedBlogs = async (req, res) => {
    try {
        const { page = 1, limit = 20, title, tags, orderBy, author } = req.query;

        const query = { state: 'published' };
        if (title) query.title = { $regex: title, $options: 'i' };
        if (tags) query.tags = { $in: tags.split(',') };
        if (author) query.author = author;

        const blogs = await Blog.find(query)
            .sort(orderBy ? { [orderBy]: -1 } : {})
            .skip((parseInt(page) - 1) * parseInt(limit))
            .limit(parseInt(limit))
            .populate('author', 'first_name last_name');

        res.status(200).json(blogs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

exports.getSingleBlogs = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || id === "undefined") {
            return res.status(400).json({ message: "Blog ID is required" });
        }

        const blog = await Blog.findOne({ _id: id });
        if (!blog) return res.status(404).json({ message: "Blog not found" });

        blog.read_count += 1;
        await blog.save();

        res.status(200).json(blog);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};



exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne({
            _id: req.params.id,
            author: req.user._id
        });
        if (!blog) return res.status(404).json({ message: 'Blog not found or unauthorized' });

        const { title, description, body, tags, state } = req.body;

        if (title) blog.title = title;
        if (description) blog.description = description;
        if (body) {
            blog.body = body;
            blog.reading_time = calculateReadingTime(body);
        }
        if (tags) blog.tags = tags;
        if (state) blog.state = state;

        const updated = await blog.save();
        res.json(updated);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findOneAndDelete({
            _id: req.params.id,
            author: req.user._id
        });
        if (!blog) return res.status(404).json({ message: 'Blog if not found or unauthorized' });

        res.json({ message: 'Blog deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

exports.publishBlog = async (req, res) => {
    try {
        const blog = await Blog.findOne({
            _id: req.params.id,
            author: req.user._id
        });
        if (!blog) return res.status(404).json({ message: 'Blog not found or unauthorized' });

        blog.state = 'published';
        const published = await blog.save();

        res.json({ message: 'Blog published', blog: published });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};
