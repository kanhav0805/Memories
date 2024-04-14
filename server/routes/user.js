//in this we will have two routes one for sign in and one for sign up
import express from "express";
import { signin, signup } from "../controllers/user.js";

//now we will create router that acts as an mini application
const router = express.Router();

//now we will add the router
router.post("/signin", signin);
router.post("/signup", signup);

export default router;
