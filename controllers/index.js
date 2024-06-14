//require in our express routes and any additional page routes within the controllers folder
const router = require(`express`).Router();
const htmlRoutes = require(`./html-routes`);
const apiRoutes = require(`./api`);


//tell the server where to send certain requests
router.use(`/`, htmlRoutes);
router.use(`/api`, apiRoutes);


module.exports = router;
