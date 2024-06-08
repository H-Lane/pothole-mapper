const router = require(`express`).Router();
const { User } = require(`../models`);

router.get(`/`, (req, res) => {
  res.render(`accountHTMLPlaceholder`);
});

router.put(`/`, async (req, res) => {
  try {
    let dbUserData = await User.findOne({
      where: {
        email: req.body.oldEmail,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.oldPassword);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    dbUserData.email = req.body.newEmail;
    dbUserData.password = req.body.newPassword;

    res
      .status(200)
      .json({ user: dbUserData, message: `Account details updated` });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
