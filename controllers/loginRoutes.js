const router = require(`express`).Router();

router.get(`/`, async (req, res) => {
    res.render(`loginpageplaceholder`);
});

// router.post(`/` async (req, res) => {

// })

module.exports = router;