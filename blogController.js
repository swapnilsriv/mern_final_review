const Blog = require('../models/blogs');
// blog-index, blog-add, blog-details, blog-get, blog delete

const blogindex = (req, res) => {
    Blog.find().sort({ createdAt: -1})
        .then((result) => {
            res.render('index', {title: 'All-Blogs', blogs:result });
        })
        .catch((err) => {
            console.log(err);
        })
}

const blogadd = (req, res) => {
    res.render('add-blog', {title: 'ADD-BLOG'});
}

const blogdetails = (req, res) => {
    const blog = new Blog(req.body);

    blog.save()
    .then((result) => {
        res.redirect('/blogs')
    })
    .catch((err) => {
        console.log(err);
    })
}

const blogget = (req, res) => {
    const id = req.params.id;

    Blog.findById(id)
    .then((result) => {
        res.render('blog-details', {blog: result, title: 'BLOG-DETAILS'});
    })
    .catch((err) => {
        console.log(err);
    })
}

const blogdelete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({ redirect: '/blogs' })
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = {
    blogindex,
    blogadd,
    blogget,
    blogdetails,
    blogdelete
}