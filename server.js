// require in several packages incl. handlebars and express for routing
const path = require(`path`);
const express = require(`express`);
const exphbs = require(`express-handlebars`);
const routes = require(`./controllers`);
const helpers = require(`./utils/helpers`);
const sequelize = require(`./config/connection`);

//create an instance of Express running on port 3001
const app = express();
const PORT = 3001;

//add in additional handlebars helper functions if necessary
const hbs = exphbs.create({ helpers });

//tell express to use handlebars as the primary view engine
app.engine(`handlebars`, hbs.engine);
app.set(`view engine`, `handlebars`);

//express necessary data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, `public`)));

//tell the server to send any routing requests to the index file within the controllers folder
app.use(routes);

//initialize sequelize
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});
