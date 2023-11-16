const User = require("../models/user");

module.exports = {
  // Get a list of users
  async getUsers(req, res) {
    try {
      const users = await User.find().populate("thoughts").populate("friends");
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a list of user by ID
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("thoughts")
        .populate("friends");

      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a user
  async createUser(req, res) {
    try {
      const dbUserData = await User.create(req.body);
      res.json(dbUserData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    const { userId } = req.params;
    const { username, email } = req.body;
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { username, email },
        { new: true, runValidators: true }
      );
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Failed to update the user." });
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    const { userId } = req.params;
    try {
      const user = await User.findByIdAndDelete(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      if (user.thoughts && user.thoughts.length > 0) {
        const thoughtsDeletionResult = await Thought.deleteMany({
          _id: { $in: user.thoughts },
        });

        if (!thoughtsDeletionResult || !thoughtsDeletionResult.ok) {
          return res
            .status(500)
            .json({ error: "Failed to delete associated thoughts." });
        }
      }

      res.json({ message: "User has been deleted." });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete the user." });
    }
  },

  // Add a friend by using their ID (user ID and Friend ID)
  async addFriend(req, res) {
    const { userId, friendId } = req.params;
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      ).populate("friends");
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Failed to add a friend." });
    }
  },

  // Remove a friend by using their ID (user ID and Friend ID)
  async removeFriend(req, res) {
    const { userId, friendId } = req.params;
    try {
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      ).populate("friends");
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: "Failed to remove a friend." });
    }
  },
};
