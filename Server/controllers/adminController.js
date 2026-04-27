import jwt from "jsonwebtoken"
import Blog from "../models/Blog.js";
import Comments from "../models/Comments.js";

// admin login controller
export const adminLogin = (req, res) => { 
    try {
        const { email, password } = req.body
        if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            res.status(401).json({ success: false, message: "Invalid Credentials" })
        }

        const token = jwt.sign({ email }, process.env.JWT_SECRET)
        res.json({ success: true, token })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}
// get all blogs by admin
export const getAllBlogsByAdmin = async (req,res) => {
   try {
      const blogs = await Blog.find({}).sort({ createdAt: -1 })

      res.status(200).json({success:true,blogs});
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
}
// get all comments for admin
export const getAllcomments = async (req,res) => {
     try {
        const comments = await Comments.find({}).populate('blog').sort({ createdAt: -1 })

        res.status(200).json({success:true,comments});
     } catch (error) {
        res.status(500).json({ message: error.message });
     }
}
// get dashboard data for admin
export const getDashboard = async (req,res) => {
     try {
        const recentBlogs = await Blog.find({}).sort({ createdAt: -1 }).limit(5);
        const blogs = await Blog.countDocuments();
        const comments = await Comments.countDocuments();
        const drafts = await Blog.countDocuments({ isPublished: false });

        const dashboardData = {
            recentBlogs,
            blogs,
            comments,
            drafts
        }

        res.status(200).json({ success: true, dashboardData });
     } catch (error) {
        res.status(500).json({ message: error.message });
     }
}
// delete comments by id 
export const deleteCommentsById = async (req,res) => {
      try {
         const { id } = req.body;
         await Comments.findByIdAndDelete(id);

        res.status(200).json({success:true,message:"Comment deleted successfully"})
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}
// Approved comments by id 
export const approveCommentsById = async (req,res) => {
      try {
         const { id } = req.body;
         await Comments.findByIdAndUpdate(id, { isApproved: true });

        res.status(200).json({success:true,message:"Comment approved successfully"})
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
}