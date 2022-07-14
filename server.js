import express from "express";
import mongoose from "mongoose";
import { databaseURI, port } from "./config/environment.js";
import router from "./config/router.js";
import path from "path";
import cors from 'cors';

const app = express();
const __dirname = path.resolve();

// setup the server
const startServer = async () => {
  try {
    await mongoose.connect(databaseURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log("🚀 DB connects successfully");

    // log
    app.use((req, _res, next) => {
      console.log(`Incoming request: METHOD: ${req.method}, URL: ${req.url}`);
      next();
    });

    app.use(express.static(`${__dirname}/client/build`));

    app.use(express.json());
    app.use(cors())

    app.use("/api", router);

    //app.get("*", function (req, res) {
    //res.sendFile(`${__dirname}/client/build/index.html`);
    //});

    app.use("/*", (_, res) =>
      res.sendFile(`${__dirname}/client/build/index.html`)
    );

    app.listen(port, () =>
      console.log(`Express is up and running on port ${port}`)
    );
  } catch (err) {
    console.log(err, "something has gone wrong");
  }
};

startServer();
