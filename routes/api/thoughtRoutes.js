const router = require("express").Router();
const {
  getThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtController");

// Handles the get thoughts and create a new thought
router.route("/").get(getThoughts).post(createThought);

// Fetch a single thought by their ID, update existing thought by ID, and delete a thought by ID.
router
  .route("/:thoughtId")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// Add and delete a reaction.
router.route("/:thoughtId/reactions").post(addReaction).delete(deleteReaction);

module.exports = router;
