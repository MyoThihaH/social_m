import express from "express";


import { auth } from "../middleware/auth.js";
import { followUsers, getUsers } from "../controllers/users.js";

const router = express.Router();

router.patch('/:id/follow', auth, followUsers);

router.get('/getUsers', auth, getUsers);

export default router;