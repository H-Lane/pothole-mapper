const router = require(`express`).Router();
const { User, Pothole, Comments } = require(`../../models`);

router.post(`/`, async (req, res) => {
  try {
    const dbCommentsData = await Comments.create({
      user_id: req.session.user_id,
      description: req.body.description,
      pothole_id: req.body.pothole_id,
    });

    const comment = dbCommentsData.toJSON();

    res.status(200).json({ comment: comment });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete(`/`, async (req, res) => {
  try {
    const dbCommentsData = await Comments.delete({
      where: { id: req.body.id },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
