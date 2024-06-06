const router = require(`express`).Router();

// the home route for the login page
router.get(`/`, async (req, res) => {
    res.render(`loginpageplaceholder`);
});

//This is the post request to login to the app
// router.post(`/` async (req, res) => {

// })

module.exports = router;