const express = require("express");
const { users } = require("../data/users.json");
// {user} means we are just accessing users array which is inside an object
const {
  getAllUsers,
  getSingleUserById,
  deleteUser,
  updateUserById,
  createNewUser,
  getSubscriptionDetailsById,
} = require("../controllers/user-controller");
const { UserModel, BookModel } = require("../models");
const router = express.Router();

/**
 * Route: /users
 * Method: GET
 * Description: Get all the users
 * Access: Public
 * Parameters: none
 */
// http://localhost:8081/users/users
router.get("/", getAllUsers);

/**
 * Route: /users/:id // : -> used for parameter
 * Method: GET
 * Description: Get single user by their id
 * Access: Public
 * Parameters: id
 */
router.get("/:id", getSingleUserById);

/**
 * Route: /users
 * Method: POST
 * Description: Create a new user
 * Access: Public
 * Parameters: none
 */
router.post("/", createNewUser);

/**
 * Route: /users/:id
 * Method: PUT
 * Description: Updating a user data
 * Access: Public
 * Parameters: id
 */
router.put("/:id", updateUserById);

/**
 * Route: /users/:id
 * Method: DELETE
 * Description: Deleting a user by their id
 * Access: Public
 * Parameters: id
 */
router.delete("/:id", deleteUser);

/**
 * Route: /users/subscription-details/:id
 * Method: Get
 * Description: showing users subscription details
 * Access: Public
 * Parameters: id
 */
router.get("/subscription-details/:id", getSubscriptionDetailsById);

// default export
module.exports = router;
