//require in our express routes and any additional page routes within the controllers folder
const router = require(`express`).Router();
const homeRoutes = require(`./homeRoutes`);
const loginRoutes = require(`./loginRoutes`);

//tell the server where to send certain requests
router.use(`/`, homeRoutes);
router.use(`/login`, loginRoutes);

module.exports = router;