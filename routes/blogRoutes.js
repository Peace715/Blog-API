const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const {
    createBlog,
    getAllPublishedBlogs,
    getSingleBlogs,
    updateBlog,
    deleteBlog,
    publishBlog
} = require('../controllers/blogController');

router.get('/', getAllPublishedBlogs);
router.get('/:id', getSingleBlogs);
router.post('/', protect, createBlog);
router.post('/:id', protect, updateBlog);
router.put('/:id', protect, updateBlog);
router.delete('/:id', protect, deleteBlog);
router.put('/:id/publish', protect, publishBlog);

module.exports = router
