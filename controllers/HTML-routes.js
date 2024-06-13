//require in our Express router
const router = require("express").Router();
const { User, Pothole, Comments } = require(`../models`);
//route for the homepage
router.get(`/`, async (req, res) => {
  try {
    const potholes = await Pothole.findAll();
    const comments = await Comments.findAll();
    res.render(`HOMEPAGEPLACEHOLDER`, { potholes, comments });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// the home route for the login page
router.get(`/login`, async (req, res) => {
  res.render(`LOGINPAGEPLACEHOLDER`);
});

//grab the account details html page
router.get(`/account`, async (req, res) => {
  try {
    const userPotholes = await Pothole.findAll({
      where: { user_id: req.session.user_id },
    });
    const userComments = await Comments.findAll({
      where: { user_id: req.session.user_id },
    });
    res.render(`ACCOUNTHTMLPLACEHOLDER`, { userPotholes, userComments });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Get HTML route for the Users reported potholes
router.get(`/reports`, (req, res) => {
  res.render(`REPORTSHTMLPLACEHOLDER`);
});

module.exports = router;
