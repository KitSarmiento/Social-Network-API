const { Thought, User } = require("../models");

module.exports = {
  // Retrieve all thoughts
  async getThoughts(req, res) {
    // Try to retrieve all thoughts and populate their reactions
    try {
      const thoughts = await Thought.find().populate("reactions");
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve thoughts." });
    }
  },

  // Retrieve a single thought by its ID
  async getThoughtById(req, res) {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findById(thoughtId).populate("reactions");
      if (!thought) {
        return res.status(404).json({ message: "Thought not found." });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ error: "Failed to retrieve the thought." });
    }
  },

  // Create a new thought
  async createThought(req, res) {
    const { thoughtText, username, userId } = req.body;
    try {
      const thought = await Thought.create({ thoughtText, username, userId });
      res.status(201).json(thought);

      // Update associated user's thoughts
      await User.findByIdAndUpdate(userId, {
        $push: { thoughts: thought._id },
      });
    } catch (error) {
      res.status(400).json({ error: "Failed to create the thought." });
    }
  },

  // Update an existing thought
  async updateThought(req, res) {
    const { thoughtId } = req.params;
    const { thoughtText } = req.body;
    try {
      const thought = await Thought.findByIdAndUpdate(
        thoughtId,
        { thoughtText },
        { new: true, runValidators: true }
      );
      if (!thought) {
        return res.status(404).json({ message: "Thought not found." });
      }
      res.json(thought);
    } catch (error) {
      res.status(400).json({ error: "Failed to update the thought." });
    }
  },

  // Delete a thought and remove its reference from associated users
  // Delete a thought and remove its reference from associated users
  async deleteThought(req, res) {
    const { thoughtId } = req.params;
    try {
      const thought = await Thought.findByIdAndDelete(thoughtId);
      if (!thought) {
        return res.status(404).json({ message: "Thought not found." });
      }

      await User.updateMany({}, { $pull: { thoughts: thoughtId } });

      res.json({ message: "Thought has been deleted.", thought });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete the thought." });
    }
  },

  // Add a reaction to a thought
  async addReaction(req, res) {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $push: { reactions: { reactionBody, username } } },
        { new: true, runValidators: true }
      );
      res.json(updatedThought);
    } catch (error) {
      res.status(400).json({ error: "Failed to add a reaction." });
    }
  },

  // Delete a reaction from a thought
  async deleteReaction(req, res) {
    const { thoughtId, reactionId } = req.params;
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        { $pull: { reactions: { _id: reactionId } } },
        { new: true }
      );
      if (!updatedThought) {
        return res.status(404).json({ message: "Reaction not found." });
      }
      res.json({
        message: "Reaction has been removed.",
        updatedThought,
      });
    } catch (error) {
      res.status(400).json({ error: "Failed to delete the reaction." });
    }
  },
};
