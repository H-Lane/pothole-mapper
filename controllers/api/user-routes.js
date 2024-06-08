const router = require(`express`).Router();
const { User } = require("../../models");

// the home route for the login page
router.get(`/login`, async (req, res) => {
  res.render(`loginpageplaceholder`);
});

//POST request to LOGIN a user
router.post(`/login`, async (req, res) => {
    try{
      //Find the User that matches the inputted email
        const dbUserData = await  User.findOne({
            where: {
                email: req.body.email,
            },
        });
        //If no email is found, return an error
        if (!dbUserData) {
            res.status(400).json({ message: `Invalid Login Credentials`});
            return;
        }
        //this checks if the password sent in is valid using the checkPassword method that needs to be added into the User model. Week 14 Activity 20
        const validPassword = await dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: `Invalid Login Credentials`});
            return
        }

        //This creates a session when the user logs in and saves the User id and the logged in status to the cookie
        req.session.save(() => {
            req.session.loggedIn = true,
            req.session.user_id = dbUserData.id,

            res.status(200).json({ user: dbUserData, message: `You are now logged in!`});
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//POST request to CREATE a new User
router.post(`/`, async (req, res) => {
  try {
    //Create a User using the User Model and pass it the information taken from the input boxes
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    //Create a new session for the newly created user
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//POST request to LOGOUT
router.post(`/logout`, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;