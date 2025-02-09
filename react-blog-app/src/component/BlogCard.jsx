import React from 'react'
import { NavLink } from 'react-router-dom'
import { toast } from 'react-toastify';
const BlogCard = ({blog,blogs,setBlogs}) => {

  //upload image
  const showImage = (img) =>{
    return (img) ? 'http://127.0.0.1:8000/uploads/temp/'+img : './image/img9.jpg';
  }

  //delete  the blog database
  const deleteBlog = async (id)=>{
    if(confirm("Are you sure you want to delete?")){
      const res = await fetch("http://127.0.0.1:8000/api/delete/"+id,{
        method:"Delete"
      });

      const newBlog = blogs.filter((blog)=>blog.id != id);
      setBlogs(newBlog);
      toast("Blog deleted successfully");

    }
  }
  return (
    <div className="col-md-2 col-lg-3 col-12 mb-4">   
    <div className="card border-0 shadow-lg">
          <img src={showImage(blog.image)} alt="loading..." className='card-img-top' width={150} height={200} />
          <div className="card-body">
            <h2 className='h5'>{blog.title}</h2>
            <p>{blog.shortDesc}</p>
            <div className="d-flex justify-content-between">
                <NavLink to={`/blog/${blog.id}`} className='btn btn-dark'>Details</NavLink>

                {/* delete icon  */}
              <div>
              <NavLink to="" className="text-danger" onClick={()=>deleteBlog(blog.id)}>
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                  </svg>
               </NavLink>

                <NavLink to={`/edit/${blog.id}`} className='text-dark ms-3'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg></NavLink>
              </div>

            </div>
          </div>
          </div>
          </div>
  )
}

export default BlogCard
