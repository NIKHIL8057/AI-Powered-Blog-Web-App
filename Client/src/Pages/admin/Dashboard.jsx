import React, { useEffect, useState } from 'react'
import { assets, dashboard_data } from '../../assets/assets'
import BlogTableitem from '../../components/admin/BlogTableitem'

const Dashboard = () => {

  const [dashboard,setDeshboard] = useState({
    blogs: 9,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  })

  const fetchDashboard = async () => {
    setDeshboard(dashboard_data)
  }

  useEffect(() => {
       fetchDashboard()
  },[])

  return (
    <div className='flex-1 p-4 bg-blue-50/50 md:p-10'>
        <div className='flex flex-wrap gap-4'>

          <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
            <img src={assets.dashboard_icon_1} alt="" />
            <div>
              <p className='text-xl font-semibold text-gray-600'>{dashboard.blogs}</p>
              <p className='text-gray-400 font-light'>Blogs</p>
            </div>
          </div>
           <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
            <img src={assets.dashboard_icon_2} alt="" />
            <div>
              <p className='text-xl font-semibold text-gray-600'>{dashboard.comments}</p>
              <p className='text-gray-400 font-light'>Comments</p>
            </div>
          </div>
           <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
            <img src={assets.dashboard_icon_3} alt="" />
            <div>
              <p className='text-xl font-semibold text-gray-600'>{dashboard.drafts}</p>
              <p className='text-gray-400 font-light'>Drafts</p>
            </div>
          </div>
        </div>

      <div>
        <div className='flex items-center text-gray-600 gap-3 m-4 mt-6'>
          <img src={assets.dashboard_icon_4} alt="" />
          <p>Latest Blogs</p>
        </div>
        
        <div className='relative max-w-4xl overflow-x-auto shadow rounded-lg scrollbar-hide bg-white'>
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
                  dashboard.recentBlogs.map((blog,index)=> {
                    return <BlogTableitem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index+1}/>
                   
                  })
                }
              </tbody>
            </table>
        </div>
      </div>

    </div>
  )
}

export default Dashboard