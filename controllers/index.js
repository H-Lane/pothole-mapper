//require in our express routes and any additional page routes within the controllers folder
const router = require(`express`).Router();
const homeRoutes = require(`./homeRoutes`);
const apiRoutes = require(`./api`);
const reportsRoutes = require(`./report-routes`);
const accountRoutes = require(`./account-routes`);

//tell the server where to send certain requests
router.use(`/`, homeRoutes);
router.use(`/api`, apiRoutes);
router.use(`/reports`, reportsRoutes);
router.use(`/account`, accountRoutes);

module.exports = router;