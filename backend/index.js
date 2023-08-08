import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import * as middleware from "./middleware/index.js";
import cors from "cors";
import authRoutes from "./controller/auth/router.js";
import attdRoutes from "./controller/attd/router.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors({exposedHeaders : "Authorization"}));
app.use(middleware.requestLogger);
app.use("/public",express.static("public"));

app.get("/", (req, res)=>{
    res.status(200).send("<h1>Hello world!</h1>")
})

app.use("/api/auth",authRoutes);
app.use("/api/attd",attdRoutes);
app.use(middleware.errorHandler);

app.listen(5000, ()=>{
    console.log(`server is running at 5000`);
})
