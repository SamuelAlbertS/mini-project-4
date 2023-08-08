import { Router } from "express";
import { verifyUser } from "../../middleware/token.verify.js";
import * as attdControllers from "./index.js";

const routes = new Router()
routes.post("/clockin",verifyUser, attdControllers.clockIn)
routes.post("/clockout",verifyUser, attdControllers.clockOut)
routes.post("/list",verifyUser, attdControllers.attendList)
routes.post("/penalty",verifyUser, attdControllers.penaltyList)

export default routes