const express = require("express");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");
var _ = require('lodash');

const app = express();

// const apiURL = "https://api.quotable.io/random";

// async function fetchRandomQuote() {
//     const response = await fetch(apiURL);
//     if (!response.ok) throw new Error('Could not fetch a new quote');
//     const data = await response.json();
//     return {
//         quote: data.content,
//         author: data.author
//     };
// }

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function (req, res) {
    res.render("home", {
        posts: posts
    });
});

app.get("/about", function (req, res) {
    res.render("about");
});


app.get("/contact", function (req, res) {
    res.render("contact");
});


app.get("/compose", function (req, res) {

    res.render("compose");
});


app.post("/compose", function (req, res) {
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody,
        authorName: (req.body.authorName ? req.body.authorName : "Unknown"),
        location: (req.body.location ? req.body.location : "Unknown")
    };
    // console.log(post)
    posts.push(post);
    res.redirect("/");
});


app.get("/posts/:postName", function (req, res) {
    const requestedTitle = _.lowerCase(req.params.postName);
    posts.forEach(function (post) {
        const storedTitle = _.lowerCase(post.title);
        if (storedTitle === requestedTitle) {
            res.render("post", {
                title: post.title,
                content: post.content,
                authorName: post.authorName,
                location: post.location
            });
            // console.log(name)
        }
    });
});


// Dark Mode Code

// if (input == true){
//     document.body.style.backgroundColor = black;
//     document.body.style.color = white;
// }

// else {
//     document.body.style.backgroundColor = white;
//     document.body.style.color = black;
// }

// 2nd method 

// const toggleMode = document.getElementById("toggle");
// toggleMode.addEventListener("click", modeSwitch);

// let isLight = true;

// function modeSwitch() {
//   isLight = !isLight;
//   let root = document.body;
  
//   isLight ? toggleMode.innerText = "????" : toggleMode.innerText = "????";
  
//   root.classList.toggle("lightMode");
// }



app.listen(3000, function () {
    console.log("Server is running on PORT 3000!");
});
