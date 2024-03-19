
import express from 'express';
import { google, signin, signup } from '../controllers/auth.controllers.js';
const router = express.Router();
router.post("/signup",signup);
router.post('/google',google)

router.post("/signin",signin);
export default router;
