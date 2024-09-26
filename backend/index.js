const express = require("express");
const mongoose = require("mongoose");
const db= require("./api/db");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
// const helmet = require("helmet");
var morgan = require("morgan");
const cron = require("node-cron");
const { createServer } = require("http");
const { Server } = require("socket.io");


const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
  maxHttpBufferSize: 1e8,
});
app.use(morgan("dev"));

app.use(cors());
// app.use(helmet());

require("dotenv").config({ path: ".env" });

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//api routers
const authRouter = require("./api/controllers/auth/router");
const productRouter = require("./api/controllers/product/router");
const orderRouter = require("./api/controllers/order/router");
const cartRouter = require("./api/controllers/cart/router");
const paymentRouter = require("./api/controllers/payment/router");
const blogRouter = require("./api/controllers/blog/router");

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/order", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/blog", blogRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    });


