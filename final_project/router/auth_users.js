const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();


let users = [];

const isValid = (username)=>{ //returns boolean
    let userswithsamename = users.filter((user) => {
        return user.username === username;
    });
    // Return true if any user with the same username is found, otherwise false
    if (userswithsamename.length > 0) {
        return true;
    } else {
        return false;
    }
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
let validusers = users.filter((user) => {
    return (user.username === username && user.password === password);
});
// Return true if any valid user is found, otherwise false
if (validusers.length > 0) {
    return true;
} else {
    return false;
}
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const username = req.body.username;
  const password = req.body.password;

  // Check if username or password is missing
  if (!username || !password) {
      return res.status(404).json({ message: "Error logging in" });
  }

  // Authenticate user
  if (authenticatedUser(username, password)) {
      // Generate JWT access token
      let accessToken = jwt.sign({
            username:username,
          data: password
      }, 'access', { expiresIn: 60 * 60 });

      // Store access token and username in session
      req.session.authorization = {
          accessToken, username
      }
      return res.status(200).send("User successfully logged in");
  } else {
      return res.status(208).json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  let isbn = req.params.isbn;
  let book = books[isbn];
  let bookReviews = book.reviews;
  let reviewers = Object.keys(bookReviews)
  //console.log("user:"+ req.session.user);
  //console.log("user1:"+ req.session.user.username);
  console.log("user2:"+ req.user.username);
  //console.log("user 4: "+JSON.stringify(req.user,null,4));
  let review =req.body.review;
  if(!review){
    if( reviewers.length <1){
    books[isbn].reviews.push({"user":req.user.username,"review":review});
    console.log("review added");
  }
  for (let reviewer of reviewers){
    console.log("reviewer" + reviewer);
if(reviewer === req.user.username){
books[isbn].reviews[reviewer].review = review;
console.log("review updated...");
}else{
    books[isbn].reviews.push({"user":req.user.username,"review":review});
    console.log("review added" +review);
}
  }
  return res.status(300).json({message: "thank you for your valuable review"});
}else{
    return res.status(300).json({message: "No review provided"});    
}
  //if(book.reviews)
  
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
