import React, { useEffect, useState } from 'react'
import { blog_data } from '../../assets/assets'
import BlogTableitem from '../../components/admin/BlogTableitem'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const ListBlog = () => {

  const [blogs,setblogs] = useState([])
  const {axios} = useAppContext();

  const fetchBlogs = async () => {
      try {
        const {data} = await axios.get('/api/admin/blogs')
        if(data?.success) {
          setblogs(data.blogs)
        } else {
          toast.error(data.message)
        }
      } catch (error) {
        toast.error(error.message)
      }
  }

  useEffect(() => {
    fetchBlogs()
  },[])

  return (
    <div className='flex-1 pt-5 px-5 bg-blue-50/50'>
          <h1 className='font-semibold'>All Blogs</h1>

          <div className='relative h-4/5 mt-4 max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
            <table className='w-full text-sm text-gray-500'>
              <thead className='text-sm text-gray-600 text-left uppercase'>
                  <tr>
                    <th scope='col' className='px-2 py-4'>#</th>
                    <th scope='col' className='px-2 py-4'>Blog Title</th>
                    <th scope='col' className='px-2 py-4'>Date</th>
                    <th scope='col' className='px-2 py-4'>Status</th>
                    <th scope='col' className='px-2 py-4'>Action</th>
                  </tr>
              </thead>
              <tbody>
                {
                  blogs.map((blog,index)=> {
                    return <BlogTableitem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index+1}/>
                   
                  })
                }
              </tbody>
            </table>
        </div>
    </div>
  )
}

export default ListBlog