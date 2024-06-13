//require in our Express router
const router = require("express").Router();
const { User, Pothole, Comments } = require(`../models`);
const { withAuth } = require(`../utils/auth`);

//route for the homepage and pass it all potholes and all comments in our db
router.get(`/`, async (req, res) => {
  try {
    const potholes = await Pothole.findAll();
    const comments = await Comments.findAll();
    res.render(`HOMEPAGEPLACEHOLDER`, { potholes, comments, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// the home route for the login page
router.get(`/login`, (req, res) => {
  res.render(`LOGINPAGEPLACEHOLDER`);
});

//grab the account details html page and pass it the users potholes and comments
router.get(`/account`, withAuth, async (req, res) => {
    res.render(`ACCOUNTHTMLPLACEHOLDER`, { logged_in: req.session.logged_in });
});

//Get HTML route for the Users reported potholes
router.get(`/reports`, withAuth, async (req, res) => {
  try {
    const userPotholes = await Pothole.findAll({
      where: { user_id: req.session.user_id },
    });
    const userComments = await Comments.findAll({
      where: { user_id: req.session.user_id },
    });
  res.render(`REPORTSHTMLPLACEHOLDER`, { userPotholes, userComments, logged_in: req.session.logged_in });
} catch (err) {
  console.log(err);
  res.status(500).json(err);
}
});

module.exports = router;
