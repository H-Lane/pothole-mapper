const router = require('express').Router();

//This is where we require all of the different pages that handle the api routes
const userRoutes = require('./user-routes');


//This tells express how to route different requests to their correct page
router.use('/users', userRoutes);


module.exports = router;