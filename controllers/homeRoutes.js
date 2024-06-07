//require in our Express router
const router = require('express').Router();

//route for the homepage
router.get(`/`, async (req, res) => {
    res.render(`homepageplaceholder`);
});

module.exports = router;