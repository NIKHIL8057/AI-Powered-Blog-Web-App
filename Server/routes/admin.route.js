import express from 'express';
import { adminLogin, approveCommentsById, deleteCommentsById, getAllBlogsByAdmin, getAllcomments, getDashboard } from '../controllers/adminController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post("/login",adminLogin)
router.get("/comments",auth,getAllcomments)
router.get("/blogs",auth,getAllBlogsByAdmin)
router.post("/delete-comments",auth,deleteCommentsById)
router.post("/approved-comments",auth,approveCommentsById)
router.get("/dashboard",auth,getDashboard)



export default router;