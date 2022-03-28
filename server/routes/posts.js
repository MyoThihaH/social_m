import express from "express";
import { auth } from "../middleware/auth.js";
import { getPost, addPost, editPost, deletePost, likePost, commentPost, replyComment } from "../controllers/posts.js";

const router = express.Router();

router.get('/',getPost);

router.post('/', auth, addPost);

router.patch('/:id', auth, editPost);

router.delete('/:id', auth, deletePost);

router.patch('/:id/like', auth, likePost);

router.patch('/:id/comment', auth, commentPost);

router.patch('/:id/comment/reply', auth, replyComment);

export default router;