const router = require(`express`).Router();
const { User } = require(`../../models`);
const { apiAuth } = require(`../../utils/auth`);

//Update User email and password
router.put(`/`, apiAuth, async (req, res) => {
  try {
    User.findByPk(req.session.user_id)
    .then((user) => {
      if (user) {
        user.name = req.body.name;
        user.email = req.body.email;
        user.password = req.body.password;
        return user.save();
      } else {
        console.log(`User Not Found`);
      }
    })
    .then((updatedUser) => {
      res
      .status(200)
      .json({ user: updatedUser, message: `Account details updated` });
    });

    // let dbUserData = await User.update(
    //   req.body,
    //   {
    //     where: { id: req.session.user_id },
    //   }
    // );

    // const userData = user.toJSON();

   
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
