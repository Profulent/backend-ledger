import express from "express";
import { userRegisterController, userLoginController } from "../controllers/auth.controller.js";







const router = express.Router()

/* POST /api/auth/register */
router.post("/register", userRegisterController)


/* POST /api/auth/login */
router.post("/login", userLoginController)




export default router;