// Used Module 18 activity 23 as a reference and update the code accordingly based on the acceptance Criteria.
const router = require("express").Router();
const userRoutes = require("./userRoutes");
const thoughtRoutes = require("./thoughtRoutes");

router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
