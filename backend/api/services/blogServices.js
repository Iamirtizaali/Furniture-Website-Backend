const Blog= require('../models/blog');
const User= require('../models/user');

const createBlog = async (blogData) => {
    try {
        const blog = new Blog(blogData);
        await blog.save();
        return blog;
    } catch (error) {
        throw error;
    }
};

const getBlogs = async () => {
    try {
        const blogs = await Blog.find();
        return blogs;
    } catch (error) {
        throw error;
    }
};

const getBlogById = async (id) => {
    try {
        const blog = await Blog.findById(id);
        return blog;
    }
    catch (error) {
        throw error;
    }
}

const updateBlog = async (id, blogData) => {
    try {
        const blog = await Blog.findByIdAndUpdate(id, blogData, { new: true });
        return blog;
    }
    catch (error) {
        throw error;
    }
}

const deleteBlog = async (id) => {
    try {
        const blog = await Blog.findByIdAndDelete(id);
        return blog;
    }
    catch (error) {
        throw error;
    }
}

module.exports = {
    createBlog,
    getBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
};
