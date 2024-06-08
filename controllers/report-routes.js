const router = require(`express`).Router();
const User = require(`../models`);

//Get HTML route for the Users reported potholes
router.get(`/`, (req, res) => {
  res.render(`reportsHTMLPlaceholder`);
});
