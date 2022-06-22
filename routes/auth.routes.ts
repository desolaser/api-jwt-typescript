import express, { Router } from "express";
import userController from "../controllers/user.controller";

const router: Router = express.Router();
router.get('/signIn', userController.signIn);
router.get('/signUp', userController.signUp);

export default router;