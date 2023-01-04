require("dotenv/config");
const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./docs/swagger.json');
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
let routers = require("./src/routes");
const appLogger = require("./src/middleware/logger");

const app = express();

// middle wares section

app.use(helmet());
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.use(require('morgan')('dev', {
  skip: function (req, res) { return res.statusCode < 400; }
}));

routers(app);

app.use(require('./src/middleware/errorHandler'));

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening at http://localhost:${port}`));
