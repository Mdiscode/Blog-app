import React from 'react';
import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
// import axios from 'axios';

const CreateBlog = () => {
    const [html, setHtml] = useState('');
    const navigate = useNavigate(); //rdirect the page

    const [image,setImageId] = useState('');
    //  const setv = (e)=>{
    //   setImageId(e)
    //  }
    function onChange(e) {
        setHtml(e.target.value);
         
      }
      
      //image change
      const handleFileChange = async (e)=>{
       const file = e.target.files[0];
      //  if(!file){
      //   console.error("no file selected");
      //   return ;
      //  }
      //  console.log(file);
      //  console.log(e.target.files);
      //  setImageId(e.target.files); 

       const  formData = new FormData();
       formData.append("image",file);

      //  Api 
      const res = await fetch("http://127.0.0.1:8000/api/tempimg",{
        method:'POST',
        body:formData
      });
        console.log(res);
      const result = await res.json();
      console.log('uplod succe');
      console.log(result);

      if(result.status === false){
        alert(result.errors.image);
        e.target.value = null;
      }
      setImageId(result.id); 
      // setv(result.id); 
      // console.log(image);
      }

      const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
      } = useForm();
     
      //store data in the database with API
      const formSubmit = async (data)=>{
        const newData ={ ...data,"description":html,"imgname":image}
        
      // console.log(newData);
     const res = await fetch("http://127.0.0.1:8000/api/blogs",{
        method:"POST",
        headers:{
          'Content-type' : 'application/json'
        },
        body :JSON.stringify(newData)
      });
      const result =await res.json();
      toast(result.message);
      // console.log(result);
    //  if(formSubmit){
    //   toast(result.message);

    //  }else{
    //   toast('Blog does not added successfully');
    //  }
      // redirect home page 
     
      navigate('/');
      }

    ///........
    

  return (
    <div className='container mb-5'>
      <div className="d-flex justify-content-between pt-5 mb-4">
        <h4>Create Blog</h4>
        <NavLink to="/" className='btn btn-dark'>back</NavLink>
      </div>
      <div className="card border-0 shadow-lg">
        {/* //from  */}
        <form onSubmit={handleSubmit(formSubmit)}>
            <div className="card-body">
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Title</label>
                    <input 
                    type="text" {...register('title',{required:true})} 
                    className={`form-control ${errors.title && 'is-invalid'}`}
                    placeholder='Title'/>
                    {/* //error  */}
                    {errors.title && <p className='invalid-feedback'>Title field is required</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Short-Description</label>
                    <textarea {...register('shortDesc')} cols="30" rows="5" className='form-control'></textarea>
                </div>
                <div className="mb-3">
                <label htmlFor="" className="form-label">Descripton</label>
                {/* <textarea className='form-control' name="" id="" col="30" row="10"></textarea> */}
                <Editor value={html} 
                containerProps={{ style: { height: '300px' } }}
                onChange={onChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="" className="form-label">Image</label>
                    <input type="file"
                     name='image' 
                    onChange={handleFileChange}
                  
                    className='form-control'/>
                
                </div>
                <div className="mb-3">
                    <label htmlFor="" className="form-label">Author</label>
                    <input 
                    {...register('author',{required:true})}
                    type="text" 
                    className={`form-control ${errors.author && 'is-invalid'}`} 
                    placeholder='Author'/>
                    {errors.author && <p className='invalid-feedback'>Author field is required</p>}
                </div>
                <button className='btn btn-dark'>Create</button>
             </div>
        </form>
        <h1>{image}</h1>
      </div>
    </div>
  )
}

export default CreateBlog
