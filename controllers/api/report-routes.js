const router = require(`express`).Router();
const { User, Pothole, Comments } = require(`../../models`);

router.post(`/`, async (req, res) => {
  try {
    const dbPotholeData = await Pothole.findAll({
        where: {user_id: req.body.user_id}
    });
    const dbCommentsData = await Comments.findAll({
        where: {user_id: req.body.user_id}
    });
    res.status(200).json(dbPotholeData, dbCommentsData)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
