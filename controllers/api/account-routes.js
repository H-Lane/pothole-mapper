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

    const userData = dbUserData.toJSON()

    res
      .status(200)
      .json({ user: userData, message: `Account details updated` });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
