const { render } = require("ejs");
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const blogRoutes = require("./routes/blogRoutes")

// connect to mongodb
const dbURI = 'mongodb+srv://chandika:chandika1994@nodetuts.eh9zl.mongodb.net/<node-tuts>?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then((result) => app.listen(3000))
.catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//routes
app.get("/", (req, res) => {
  res.redirect('/blogs');
}); 

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});


// blog routes
app.use('/blogs',blogRoutes);

app.use((req, res) => {
  res.render("404", {title: '404'});
});
