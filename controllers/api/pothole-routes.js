const router = require(`express`).Router();
const { User, Pothole, Comments } = require("../../models");

router.get(`/`, async (req, res) => {
  try {
    const potholes = await Pothole.findAll();
    const comments = await Comments.findAll();

    res.status(200).json({ potholes, comments });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post(`/`, async (req, res) => {
  try {
    const pothole = await Pothole.create(req.body);

    const comment = await Comments.create({
      user_id: req.session.user_id,
      description: req.body.description,
      pothole_id: dbPotholeData.id,
    });
    res.status(200).json({ message: `Pothole Added!`, pothole, comment });
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
