const router = require(`express`).Router();
const { User, Pothole, Comments } = require("../../models");

//GET request for /api/pothole that returns all of the Potholes and Comments in the database
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

//POST request to create a new Pothole, then add a Comment with that Pothole and then return them both so they can be rendered onto the page. 
router.post(`/`, async (req, res) => {
  try {
    const pothole = await Pothole.create(req.body);

    const comment = await Comments.create({
      user_id: req.session.user_id,
      description: req.body.description,
      pothole_id: pothole.id,
    });
    res.status(200).json({ message: `Pothole Added!`, pothole, comment });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//DELETE request to /api/pothole that removes a pothole from the database
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
