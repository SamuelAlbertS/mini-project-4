import Router from "express";
import {verifyAdmin, verifyUser} from "../../middleware/token.verify.js"
import * as authControllers from "./index.js";

const routes = new Router()
routes.post("/register",verifyAdmin, authControllers.register)
routes.post("/login",authControllers.login)
routes.patch("/verify",authControllers.verification)
routes.get("/keeplogin",verifyUser,authControllers.keepLogin)
routes.put("/forget",authControllers.forgetPassword)
routes.patch("/reset",authControllers.resetPassword)
routes.patch("/update",verifyUser,authControllers.updateUser)
routes.post("/requestotp",authControllers.requestOtp)

export default routes