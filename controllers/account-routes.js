const router = require(`express`).Router();
const { User } = require(`../models`);

//grab the account details html page
router.get(`/`, (req, res) => {
  res.render(`accountHTMLPlaceholder`);
});

//Update User email and password
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
    //apply the new email/password sent with the post request from the Javascript
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
