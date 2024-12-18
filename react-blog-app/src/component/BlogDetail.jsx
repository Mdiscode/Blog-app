import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom';

const BlogDetail = () => {
    const [detail,setdetail] =useState('');
    const prams = useParams();

    const fetchBlog = async ()=>{
        // console.log(prams.id);
        const res =await  fetch('http://127.0.0.1:8000/api/show/'+prams.id);
        const result = await res.json();
        // console.log(result);
        setdetail(result.data);
    }

    useEffect(()=>{
        fetchBlog();
    },[]);
  return (
    <div className="container">
    <div className="d-flex justify-content-between pt-4 mb-4">
      <h2>{detail.title}</h2>
      <div>
      <NavLink to="/" className="btn btn-dark">Back to Block</NavLink>
      
      </div>
    </div>
    {/* //card  */}
    <div className="row">
      <div class="col-md-12">
        <p>By <strong>{detail.author}</strong> on {detail.date}</p>
         {
          (detail.image) && <img className='w-100 ' src={`http://127.0.0.1:8000/uploads/temp/${detail.image}`}  height={500}/>
         }
         <div className='mt-5'>
          {detail.description}
         </div>
      </div>
      
    
      
    </div>
  </div>
  )
}

export default BlogDetail
