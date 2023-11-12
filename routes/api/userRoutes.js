// Used Module 18 activity 23 as a reference add added
const router = require("express").Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// Handles the get users and create a new user
router.route("/").get(getUsers).post(createUser);

// Fetch a single user by their ID, update existing user by their ID, and delete a user by their ID.
router.route("/:userId").get(getUserById).put(updateUser).delete(deleteUser);

// Add and delete a user in the friend list.
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
