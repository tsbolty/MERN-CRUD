const router = require("express").Router();
const testRoutes = require("./test-routes");

// API Routes
router.use("/test", testRoutes);
module.exports = router;
