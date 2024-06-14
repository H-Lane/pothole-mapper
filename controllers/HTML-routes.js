//require in our Express router
const router = require("express").Router();
const { User, Pothole, Comments } = require(`../models`);
const { withAuth } = require(`../utils/auth`);

//route for the homepage and pass it all potholes and all comments in our db
router.get(`/`, withAuth, async (req, res) => {
  try {
    const potholes = await Pothole.findAll();
    const comments = await Comments.findAll();
    res.render(`map`, { potholes, comments, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// the home route for the login page
router.get(`/login`, (req, res) => {
  res.render(`login`, { logged_in: req.session.logged_in });
});

//grab the account details html page and pass it the users potholes and comments
router.get(`/account`, withAuth, async (req, res) => {
  try {
    const dbUserData = await User.findByPk(req.session.user_id);

    res.render(`account`, { logged_in: req.session.logged_in, dbUserData });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
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
    res.render(`reports`, {
      userPotholes,
      userComments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
