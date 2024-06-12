const router = require(`express`).Router();
const { User, Pothole, Comments } = require("../../models");

router.post(`/`, async (req, res) => {
  try {
    const dbPotholeData = await Pothole.create(req.body);

    const dbCommentsData = await Comments.create({
      user_id: req.body.user_id,
      description: req.body.description,
      pothole_id: dbPotholeData.id,
    });
    res.status(200).json({ message: `Pothole Added!`, dbPotholeData, dbCommentsData });
    

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
