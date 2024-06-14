const router = require("express").Router();

//This is where we require all of the different pages that handle the api routes
const userRoutes = require("./user-routes");
const reportsRoutes = require(`./report-routes`);
const accountRoutes = require(`./account-routes`);
const potholeRoutes = require(`./pothole-routes`);
const commentRoutes = require(`./comment-routes`);

//This tells express how to route different requests to their correct page
router.use(`/users`, userRoutes);
router.use(`/reports`, reportsRoutes);
router.use(`/account`, accountRoutes);
router.use(`/pothole`, potholeRoutes);
router.use(`/comment`, commentRoutes);

module.exports = router;
