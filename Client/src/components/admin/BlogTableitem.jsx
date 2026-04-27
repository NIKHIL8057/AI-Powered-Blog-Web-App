import React from "react";
import { assets } from "../../assets/assets";

const BlogTableitem = ({ blog, fetchBlogs, index }) => {
  const { title, createdAt } = blog;
  const BlogData = new Date(createdAt);

  return (
    <tr className="border-y border-gray-300">
      <th className="px-2 py4">{index}</th>
      <td className="px-2 py-4">{title}</td>
      <td className="px-2 py-4">{BlogData.toDateString()}</td>
      <td className="px-2 py-4">
        <p className={`${blog.isPublished ? "text-gray-600" : "text-orange-600"}`}>
          {blog.isPublished ? "Published" : "Unpublished"}
        </p>
      </td>
      <td className="px-2 py-4 flex text-xs gap-3">
          <button className="border px-2 py-0.5 mt-1 rounded cursor-pointer">{blog.isPublished ? "Unpublish" : "Publish"}</button>
          <img src={assets.cross_icon} className="w-8 hover:scale-110 transition-all cursor-pointer" alt="" />
      </td>
    </tr>
  );
};

export default BlogTableitem;
