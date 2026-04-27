import fs from "fs"
import Blog from "../models/Blog.js";
import imagekit from "../config/imagekit.js"
import Comments from "../models/Comments.js";

// Controller to add a new blog post with image upload and optimization
export const addBlog = async (req,res) => {
    try {
        const { title, subTitle, description, category, isPublished } = JSON.parse(req.body.blog);

        const imageFile = req.file;

        if (!title || !description || !category || !imageFile) {
            return res.status(400).json({ message: "Please fill all the required fields" });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        // upload image to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        });

        // optimization through imagekit URL transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                 {quality:'auto'}, // auto compression for optimization
                 {format:'webp'}, // convert to webp for better performance
                 {width:1280} // width constraint for responsive design
            ]
        });

        const image = optimizedImageUrl; // use the optimized image URL

       await Blog.create({
            title,
            subTitle,
            description,
            category,
            image,
            isPublished
        });
       
        res.status(201).json({success:true,message: "Blog added successfully"});
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// get all blogs
export const getAllBlogs = async (req,res) => {
    try {
        const blogs = await Blog.find({isPublished:true})
        res.status(200).json({success:true,blogs});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// get blog by id
export const getBlogById = async (req,res) => {
    try {
         const { blogId } = req.params;
         const blog = await Blog.findById(blogId);
         if(!blog){
            return res.status(404).json({ message: "Blog not found" });
         }
            res.status(200).json({success:true,blog}); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// delete blog by id
export const deleteBlogById = async (req,res) => {
    try {
         const { id } = req.body;
         await Blog.findByIdAndDelete(id); 

        // delete all associated comments
        await Comments.deleteMany({ blog: id });

        res.status(200).json({success:true,mwessage: "Blog deleted successfully"}); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// Published or Unpublish blog by id
export const togglePublish = async (req,res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id); 
        blog.isPublished = !blog.isPublished; // toggle the published status
        await blog.save(); // save the updated blog

        res.status(200).json({success:true,message:"Blog status updated successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
// add comments to blogs
export const addComments = async (req,res) => {
     try {
        const { blog,name,content } = req.body;
        await Comments.create({ blog,name,content });
        res.status(201).json({success:true,message:"Comment added for review"})
     } catch (error) {
        res.status(500).json({ message: error.message });
     }
}
// get comments for a blog
export const getBlogcommnets = async (req,res) => {
    try {
        const { blogId } = req.body;
        const comments = await Comments.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 }); // get approved comments for the blog sorted by newest first

        res.status(200).json({success:true,comments});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}