const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./database/db");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./documentation.json");
require('dotenv').config();

//Cek koneksi mongodb
mongoose.Promise = global.Promise;
mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(
    () => {
      console.log("Database connected");
    },
    error => {
      console.log("Database can't be connected: " + error);
    }
  );

// Remove MongoDB warning error
mongoose.set("useCreateIndex", true);

//Express setup
const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cors());

//Setup Router
const authRoutes = require("./routes/auth.routes");
app.use("/api/v1", authRoutes);
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Listen server
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Server is up and running on port: " + port);
});
