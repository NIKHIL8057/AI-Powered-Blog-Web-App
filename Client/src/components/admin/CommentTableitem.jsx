import React from 'react'
import { assets } from '../../assets/assets';

const CommentTableitem = ({comment,fetchComments}) => {

    const {blog,createdAt,_id} = comment;
    const BlogData = new Date(createdAt)

  return (

    <tr className='border-b border-gray-300 hover:bg-gray-50 transition'> 
        
        <td className='px-6 py-4 text-sm text-gray-700'> 
           <p>
             <b className='font-medium text-gray-600'>Blog</b> : {blog.title}
           </p>

           <p className='mt-2'> 
             <b className='font-medium text-gray-600'>Name</b> : {comment.name}
           </p>

           <p className='mt-1'>
             <b className='font-medium text-gray-600'>Comment</b> : {comment.content}
           </p>
        </td>

        <td className='px-6 py-4 text-sm text-gray-500 whitespace-nowrap'> 
            {BlogData.toDateString()}
        </td>

        <td className='px-6 py-4'>
            <div className='inline-flex items-center gap-4'>
                
                {!comment.isApproved ? 
               <img 
                 src={assets.tick_icon} 
                 className='w-5 hover:scale-110 transition-all cursor-pointer' 
               />    
             : 
             <p className='text-xs border border-green-200 bg-green-50 text-green-600 rounded-full px-3 py-1'>
                Approved
             </p> 
             }

             <img 
               src={assets.bin_icon} 
               className='w-5 hover:scale-110 transition-all cursor-pointer' 
             />
            </div>
        </td>

    </tr>
  )
}

export default CommentTableitem