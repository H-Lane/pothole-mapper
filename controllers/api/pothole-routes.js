const router = require(`express`).Router();
const { User, Pothole, Comments } = require("../../models");

router.get(`/`, async (req, res) => {
  try {
    const allPotholes = await Pothole.findAll();
    const allComments = await Comments.findAll();

    const potholes = allPotholes.toJSON();
    const comments = allComments.toJSON();

    res.status(200).json({ potholes: potholes, comments: comments });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post(`/`, async (req, res) => {
  try {
    const newPothole = await Pothole.create(req.body);

    const newComment = await Comments.create({
      user_id: req.session.user_id,
      description: req.body.description,
      pothole_id: pothole.id,
    });

    const pothole = newPothole.toJSON();
    const comment = newComment.toJSON();

    res.status(200).json({ message: `Pothole Added!`, pothole: pothole, comment: comment });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete(`/`, async (req, res) => {
  try {
    const dbPotholeData = await Pothole.destroy({
      where: { id: req.body.pothole_id },
    });
    res.status(200).json({ message: `Pothole Removed!` });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
