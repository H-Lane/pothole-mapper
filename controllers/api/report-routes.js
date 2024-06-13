const router = require(`express`).Router();
const { User, Pothole, Comments } = require(`../../models`);

router.get(`/`, async (req, res) => {
  try {
    const potholes = await Pothole.findAll({
        where: {user_id: req.session.user_id}
    });
    const comments = await Comments.findAll({
        where: {user_id: req.session.user_id}
    });
    res.status(200).json({ potholes, comments })
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
