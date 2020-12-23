const Blog = require('../models/blog');

const blog_index = (req, res) => {
    Blog.find()
      .then((result) => {
        res.render('index', { title: 'All Blogs', blogs: result});
      })
      .catch((err) => {
        console.log(err);
    });
}

const blog_create = (req, res) => {
  res.render("create", { title: "New Blog" });
}

const blog_create_post = (req,res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then((result) => {
      res.redirect('/blogs');
    })
    .catch((err) => {
      console.log(err);
    })
}

const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render('single', { blog: result, title: 'Single Blog' })
    })
    .catch ((err) => {
      res.status(404).render('404', { title: 'Blog not found'} );
    })
}

const blog_delete = (req,res) => {
  const id = req.params.id;

  Blog.findByIdAndDelete(id)
  .then( result => {
    res.json({redirect: '/blogs'})
  })
  .catch(err=>console.log(err))
}

module.exports = {
  blog_index,
  blog_create,
  blog_create_post,
  blog_details,
  blog_delete
}