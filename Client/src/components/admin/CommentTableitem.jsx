import React from "react";
import { assets } from "../../assets/assets";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const CommentTableitem = ({ comment, fetchComments }) => {
  const { blog, createdAt, _id } = comment;
  const BlogData = new Date(createdAt);

  const { axios } = useAppContext();

  const approveComment = async () => {
    try {
      const { data } = await axios.post("/api/admin/approved-comments", {id: _id,});
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteComment = async () => {
    try {
      const confirm = window.confirm("Are you sure to delete this comment?");
      if (!confirm) return;

      const { data } = await axios.post("/api/admin/delete-comments", { id: _id });
      if (data.success) {
        toast.success(data.message);
        fetchComments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <tr className="border-b border-gray-300 hover:bg-gray-50 transition">
      <td className="px-6 py-4 text-sm text-gray-700">
        <p>
          <b className="font-medium text-gray-600">Blog</b> : {blog.title}
        </p>

        <p className="mt-2">
          <b className="font-medium text-gray-600">Name</b> : {comment.name}
        </p>

        <p className="mt-1">
          <b className="font-medium text-gray-600">Comment</b> :{" "}
          {comment.content}
        </p>
      </td>

      <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
        {BlogData.toDateString()}
      </td>

      <td className="px-6 py-4">
        <div className="inline-flex items-center gap-4">
          {!comment.isApproved ? (
            <img
              onClick={approveComment}
              src={assets.tick_icon}
              className="w-5 hover:scale-110 transition-all cursor-pointer"
            />
          ) : (
            <p className="text-xs border border-green-200 bg-green-50 text-green-600 rounded-full px-3 py-1">
              Approved
            </p>
          )}

          <img
            onClick={deleteComment}
            src={assets.bin_icon}
            className="w-5 hover:scale-110 transition-all cursor-pointer"
          />
        </div>
      </td>
    </tr>
  );
};

export default CommentTableitem;
