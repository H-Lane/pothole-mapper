const router = require(`express`).Router();
const homeRoutes = require(`./homeRoutes`);
const loginRoutes = require(`./loginRoutes`);

router.use(`/`, homeRoutes);
router.use(`/login`, loginRoutes);

module.exports = router;