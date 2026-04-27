import React, { use, useEffect, useState } from 'react'
import { comments_data } from '../../assets/assets'
import CommentTableitem from '../../components/admin/CommentTableitem'

const Comments = () => {

  const [comments,setComments] = useState([])
  const [filter,setFilter] = useState("Approved")

  const fetchComments = async () => {
    setComments(comments_data)
  }

  useEffect(() => {
    fetchComments()
  },[])

  return (
    <div className='flex-1 pt-5 px-5 bg-blue-50/50'>
       <div className='flex justify-between items-center max-w-3xl'>
        <h1>Comments</h1>
        <div className='flex gap-4'>
          <button onClick={() => setFilter('Approved')} className={`shadow-custom-sm border rounded-full py-1 px-4 cursor-pointer text-sm ${filter === "Approved" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}>Approved</button>

           <button onClick={() => setFilter('Not Approved')} className={`shadow-custom-sm border rounded-full py-1 px-4 cursor-pointer text-sm ${filter === "Not Approved" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}>Not Approved</button>
        </div>
       </div>
       <div className='relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide'>
        <table className='w-full text-sm text-gray-600'>
          <thead className='text-sm text-gray-600 text-left uppercase'>
            <tr>
              <th scope='col' className='px-6 py-3'>Blog Title & Comments</th>
              <th scope='col' className='px-6 py-3'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody> 
              
              {
                comments.filter((comment) => {
                  if(filter === "Approved") {
                    return comment.isApproved === true;
                    return comment.isApproved === false;
                  }
                }).map((comment,index) => 
                  <CommentTableitem key={comment._id} comment={comment} index={index+1} fetchComments={fetchComments} />
                )
              }

          </tbody>
        </table>
       </div>
    </div>
  )
}

export default Comments