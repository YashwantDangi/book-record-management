const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all the books
 * Access: Public
 * Parameters: none
 */

router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: books });
});

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get book by their id
 * Access: Public
 * Parameters: id
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = books.find((each) => each.id === id);

  if (!book)
    return res.status(404).json({ success: false, message: "Book not found" });
  return res.status(201).json({ success: true, data: book });
});

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: none
 */
router.get("/issued/by-user", (req, res) => {
  const usersWithIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });
  const issuedBooks = [];

  usersWithIssuedBook.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });
  if (issuedBooks.length === 0)
    return res
      .status(404)
      .json({ success: false, message: "No book has been issued" });
  return res.status(200).json({ success: true, data: issuedBooks });
});

/**
 * Route: /books
 * Method: POST
 * Description: Create new book
 * Access: Public
 * Parameters: none
 */
router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(404).json({
      success: false,
      message: "No Data Was Provided",
    });
  }

  const book = books.find((each) => each.id === data.id);

  if (book) {
    return res.status(404).json({
      success: false,
      message: "Book already exists with the same Id",
    });
  }

  const allBooks = [...books, data];

  return res.status(200).json({
    success: true,
    data: allBooks,
  });
});

/**
 * Route: /books/:id
 * Method: PUT
 * Description: Updating a book
 * Access: Public
 * Parameters: id
 */
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;

  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(404).json({
      success: false,
      message: "Book not found with that particular Id",
    });
  }
  const updatedData = books.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }
    return each;
  });

  return res.status(200).json({
    success: true,
    data: updatedData,
  });
});

/**
 * Route: /books/issued/withFine
 * Method: GET
 * Description: Get all issued books with fine
 * Access: Public
 * Parameters: none
 */
router.get("/issued/withFine", (req, res) => {

  // users who have issued the book
  const userwithIssuedBook = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  // if no user have issued any book
  if (!userwithIssuedBook)
    return res
      .status(404)
      .json({ success: false, message: "No user found with issued book" });

  // get Date in days function
  const getDateInDays = (data = "") => {
    let date;
    if (data === "") date = new Date();
    else date = new Date(data);
    let days = Math.floor(date / (1000 * 60 * 60 * 24));
    return days;
  };

  // Calc subsciption days
  const subscriptionType = (date) => {
    if (userwithIssuedBook.subscriptionType === "Basic") date += 90;
    else if (userwithIssuedBook.subscriptionType === "Standard") date += 180;
    else if (userwithIssuedBook.subscriptionType === "Premium") date += 365;
  };

  const issuedBooks = [];

  userwithIssuedBook.forEach((each) => {
    
    let currentDate = getDateInDays();
    let returnDate = getDateInDays(each.returnDate);
    let subscriptionDate = getDateInDays(each.subscriptionDate);
    let subscriptionExpiration = subscriptionType(subscriptionDate);
    let fineOnBook = returnDate < currentDate ? subscriptionExpiration < currentDate ? 200 : 100 : 0;

    // finding issued book
    const book = books.find((book) => book.id === each.issuedBook);

    // adding fine to books data
    book.fine = fineOnBook;

    // adding issued book into the issuedBooks array
    issuedBooks.push(book);
  });

  // filtering issued book with fine
  const issuedBookWithFine = issuedBooks.filter((each) => each.fine != 0);

  // if no issued book with fine found
  if (issuedBookWithFine.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "No book has been issued" });
  }
  
  
  return res.status(200).json({
    success: true,
    data : issuedBookWithFine,
  });
});

module.exports = router;
 