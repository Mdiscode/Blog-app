import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard';
import {NavLink} from 'react-router-dom';


const Blogs = () => {
  const [blogs,setBlogs]=useState();
  const [keyword,setkeyword]=useState('');
  
  //fetch the data to the datdabse
  const fetchBlogs = async ()=>{
    const res = await fetch('http://127.0.0.1:8000/api/blogs');
    const result = await res.json();
    // console.log(result);
    // setblogs 
    setBlogs(result.data);
  }

  //search the blog
  const searchBlog = async (e)=>{
    e.preventDefault();
    const res = await fetch('http://127.0.0.1:8000/api/blogs?keyword='+keyword);
    const result = await res.json();
    setBlogs(result.data);

  }
  //reset function
  const resetSearch = ()=>{
    fetchBlogs();
    setkeyword('');
  }

  //call fetch method 
  useEffect(()=>{
    fetchBlogs();
  },[]);



  return (
    <div className="container">
      <div className="d-flex justify-content-center pt-5 mb-2">
        <form onSubmit={(e)=> searchBlog(e)}>
            <div className='d-flex'>
              <input type="search" value={keyword} onChange={(e)=>setkeyword(e.target.value)} className='form-control' placeholder='Search Blog'/>
              <button className='btn btn-dark ms-2'>Search</button>
              <button onClick={()=>resetSearch()} className='btn btn-success ms-2'>Reset</button>
            </div>
        </form>
      </div>
    <div className="d-flex justify-content-between pt-4 mb-4">
      <h1>Blogs</h1>
      {/* <a href="/createblog" className='btn btn-dark'>Create</a> */}
      <NavLink to="/createblog" className="btn btn-dark">Create</NavLink>
    </div>
    {/* //card  */}
    <div className="row">
      
      {
        (blogs) && blogs.map((blog)=>{
          return (<BlogCard blogs={blogs} setBlogs={setBlogs} blog={blog} key={blog.id}/>);
        })
      }
      
      
      
    </div>
  </div>
  )
}

export default Blogs
