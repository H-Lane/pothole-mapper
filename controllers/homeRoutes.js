const router = require('express').Router();

router.get(`/`, async (req, res) => {
    res.render(`homepageplaceholder`);
});

module.exports = router;