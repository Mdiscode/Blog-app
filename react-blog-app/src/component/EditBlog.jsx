import React, { useEffect } from 'react';
import { useState } from 'react';
import Editor from 'react-simple-wysiwyg';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const EditBlog = () => {
    const [detail,setdetail] =useState('');
    const prams = useParams();

    const [html, setHtml] = useState('');
    const navigate = useNavigate(); //rdirect the page

    const [imageId,setImageId] = useState();

    function onChange(e) {
        setHtml(e.target.value);
        
      }
  
      //image change
      const handleFileChange = async (e)=>{
       const file = e.target.files[0];
       const  formData = new FormData();
       formData.append("image",file);

      //  Api 
      const res = await fetch("http://127.0.0.1:8000/api/tempimg",{
        method:'POST',
        body:formData
      });

      const result = res.json();
      // console.log(result.image.id);
      if(result.status === false){
        alert(result.errors.image);
        e.target.value = null;
      }
      setImageId(result.image.id); 
      // console.log(result.image.id);
      }

      const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors },
      } = useForm();
     
      //When form is submit store data in the database with API
      const formSubmit = async (data)=>{
        const newData ={ ...data,"description":html,image_id:imageId}
        
      // console.log(newData);
     const res = await fetch("http://127.0.0.1:8000/api/update/"+prams.id,{
        method:"put",
        headers:{
          'Content-type' : 'application/json'
        },
        body :JSON.stringify(newData)
      });
      toast('Blog Updated successfully');
      // redirect home page 
      navigate('/');
        
      }

      //fetch the  data

    const fetchBlog = async ()=>{
        // console.log(prams.id);
        const res =await  fetch('http://127.0.0.1:8000/api/show/'+prams.id);
        const result = await res.json();
        // console.log(result);
        setdetail(result.data);
        setHtml(result.data.description);
        reset(result.data);
    }

    useEffect(()=>{
        fetchBlog();
    },[]);

  return (
    <div className='container mb-5'>
      <div className="d-flex justify-content-between pt-5 mb-4">
        <h4>Edit Blog</h4>
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
                    <input type="file" name='image' onChange={handleFileChange} className='form-control'/>
                    {
                        (detail.image) && <img className='w-50 mt-3 ' src={`http://127.0.0.1:8000/uploads/blogs/${detail.image}`}  height={300}/>
                    }
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
                <button className='btn btn-dark'>Update</button>
             </div>
        </form>
      </div>
    </div>
  )
}

export default EditBlog
