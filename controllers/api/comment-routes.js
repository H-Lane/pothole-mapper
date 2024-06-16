const router = require(`express`).Router();
const { User, Pothole, Comments } = require(`../../models`);

//POST route to /api/comment to create a comment in the table
router.post(`/`, async (req, res) => {
    try {
        const dbCommentsData = await Comments.create({
            user_id: req.session.user_id,
            description: req.body.description,
            pothole_id: req.body.pothole_id
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

//Potential DELETE route to delete a user from the system.
router.delete(`/`, async (req, res) => {
    try {
        const dbCommentsData = await Comments.delete({
            where: {id: req.session.user_id}
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});


module.exports = router;