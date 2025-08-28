const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const request = require('request');


public_users.post("/register", (req,res) => {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const username = req.body.username;
    const password = req.body.password;

    // Check if both username and password are provided
    if (username && password) {
        // Check if the user does not already exist
        if (!isValid(username)) {
            // Add the new user to the users array
            users.push({"username": username, "password": password});
            return res.status(200).json({message: "User successfully registered. Now you can login"});
        } else {
            return res.status(404).json({message: "User already exists!"});
        }
    }
    // Return error if username or password is missing
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
 // return res.status(300).json({message: "Yet to be implemented"});
 const ISBN = req.params.isbn;
    res.send(JSON.stringify(books[ISBN],null,4));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  const author = req.params.author;
  const bookKeys = Object.keys(books)
  let filtBook = null;
  for (let i of bookKeys) {
    if(books[i].author === author){
        filtBook = books[i];
    }
  }
   res.send(JSON.stringify(filtBook, null, 4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});

  const title = req.params.title;
  const bookKeys = Object.keys(books)
  let filtBook = null;
  for (let i of bookKeys) {
    if(books[i].title === title){
        filtBook = books[i];
    }
  }
   res.send(JSON.stringify(filtBook, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
   const ISBN = req.params.isbn;
  res.send(JSON.stringify(books[ISBN].reviews,null, 4));
 // res.send("hello");
});

/// Using promise get all books
function getAllBooks(url) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        request(url, (error, response, body) => {
            if (error) {
                reject(error); // Reject the Promise if an error occurs
            } else if (response.statusCode !== 200) {
                reject(new Error(`HTTP Status Code: ${response.statusCode}`)); // Handle non-200 status codes
            } else {
                resolve(body); // Resolve the Promise with the response body
            }
        });
    },1000);
    });
}
getAllBooks('https://jismitinujac-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/')
    .then(data => {
        console.log('Response:', data);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });

    function getBooksByAuthor(url) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
            request(url, (error, response, body) => {
                if (error) {
                    reject(error); // Reject the Promise if an error occurs
                } else if (response.statusCode !== 200) {
                    reject(new Error(`HTTP Status Code: ${response.statusCode}`)); // Handle non-200 status codes
                } else {
                    resolve(body); // Resolve the Promise with the response body
                }
            });
        },1000);
        });
    }
    
    getBooksByAuthor('https://jismitinujac-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/author/Jane Austen')
        .then(data => {
            console.log('Response:', data);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });


        function getBooksBuISBN(url) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                request(url, (error, response, body) => {
                    if (error) {
                        reject(error); // Reject the Promise if an error occurs
                    } else if (response.statusCode !== 200) {
                        reject(new Error(`HTTP Status Code: ${response.statusCode}`)); // Handle non-200 status codes
                    } else {
                        resolve(body); // Resolve the Promise with the response body
                    }
                });
            },1000);
            });
        }
        
        getBooksBuISBN('https://jismitinujac-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/isbn/1')
            .then(data => {
                console.log('Response:', data);
            })
            .catch(error => {
                console.error('Error:', error.message);
            });


            function getBooksByTitle(url) {
                return new Promise((resolve, reject) => {

                    setTimeout(() => {
                       
                    request(url, (error, response, body) => {
                        if (error) {
                            reject(error); // Reject the Promise if an error occurs
                        } else if (response.statusCode !== 200) {
                            reject(new Error(`HTTP Status Code: ${response.statusCode}`)); // Handle non-200 status codes
                        } else {
                            resolve(body); // Resolve the Promise with the response body
                        }
                    });
                },6000);
                    
                });
            }
            
            getBooksByTitle('https://jismitinujac-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/title/Pride and Prejudice')
                .then(data => {
                    console.log('Response:', data);
                })
                .catch(error => {
                    console.error('Error:', error.message);
                });


module.exports.general = public_users;
