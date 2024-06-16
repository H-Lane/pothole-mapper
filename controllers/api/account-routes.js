const router = require(`express`).Router();
const { User } = require(`../../models`);
// Require in a middleware that ensures the route cannot be accessed by anyone not logged in
const { apiAuth } = require(`../../utils/auth`);

//Update User email and password
router.put(`/`, apiAuth, async (req, res) => {
  try {
    //update the user matching the current session id sending req.body, ensuring the body passed contains name, email, and password
    let dbUserData = await User.update(
      {
        where: { id: req.session.user_id },
      },
      req.body
    );
    res
      .status(200)
      .json({ user: dbUserData, message: `Account details updated` });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
