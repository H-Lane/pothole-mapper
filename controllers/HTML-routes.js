//require in our Express router
const router = require("express").Router();

//route for the homepage
router.get(`/`, async (req, res) => {
  res.render(`HOMEPAGEPLACEHOLDER`);
});

// the home route for the login page
router.get(`/login`, async (req, res) => {
  res.render(`LOGINPAGEPLACEHOLDER`);
});

//grab the account details html page
router.get(`/account`, (req, res) => {
  res.render(`ACCOUNTHTMLPLACEHOLDER`);
});

//Get HTML route for the Users reported potholes
router.get(`/reports`, (req, res) => {
  res.render(`REPORTSHTMLPLACEHOLDER`);
});

module.exports = router;
