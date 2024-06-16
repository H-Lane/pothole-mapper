const router = require(`express`).Router();
const { User, Pothole, Comments } = require(`../../models`);

router.get(`/`, async (req, res) => {
  try {
    const userPotholes = await Pothole.findAll({
        where: {user_id: req.session.user_id}
    });
    const userComments = await Comments.findAll({
        where: {user_id: req.session.user_id}
    });

    const potholes = userPotholes.toJSON();
    const comments = userComments.toJSON();

    res.status(200).json({ potholes: potholes, comments: comments })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
