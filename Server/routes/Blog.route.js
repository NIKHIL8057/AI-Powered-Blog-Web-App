import express from 'express';
import { addBlog, addComments, deleteBlogById, generateContent, getAllBlogs, getBlogById, getBlogcommnets, togglePublish } from '../controllers/BlogController.js';
import upload from '../middleware/multer.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post("/add",upload.single('image'),auth,addBlog)
router.get("/all",getAllBlogs)
router.get("/:blogId",getBlogById)
router.post("/delete",auth,deleteBlogById)
router.post("/toggle-publish",auth,togglePublish)
router.post("/add-comment",addComments)
router.post("/comments",getBlogcommnets)

router.post("/generate",auth,generateContent)

export default router;