import express from 'express';
import { adminLogin, approveCommentsById, deleteCommentsById, getAllBlogsByAdmin, getAllcomments, getDashboard } from '../controllers/adminController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post("/login",adminLogin)
router.post("/comments",auth,getAllcomments)
router.post("/blogs",auth,getAllBlogsByAdmin)
router.post("/delete-comments",auth,deleteCommentsById)
router.post("/approved-comments",auth,approveCommentsById)
router.post("/dashboard",auth,getDashboard)



export default router;