const router = require(`express`).Router();
const { User } = require(`../../models`);
const { apiAuth } = require(`../../utils/auth`);

//Update User email and password
router.put(`/`, apiAuth, async (req, res) => {
  try {
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
