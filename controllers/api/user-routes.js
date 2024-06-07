const router = require(`express`).Router();
const { User } = require('../../models');

// the home route for the login page
router.get(`/login`, async (req, res) => {
    res.render(`loginpageplaceholder`);
});

router.post(`/`, async (req, res) => {
    try {
        const dbUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });


    }
})

module.exports = router;