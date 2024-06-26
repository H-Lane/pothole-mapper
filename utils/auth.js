const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    // If the user is logged in, execute the route function that will allow them to view the requested page
    // We call next() if the user is authenticated
    next();
  }
};

const apiAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.send(`You must be logged in`);
  } else {
    next();
  }
};

module.exports = { withAuth, apiAuth };
