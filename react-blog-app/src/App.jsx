import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Route, Routes } from 'react-router-dom';
import Blogs from './component/Blogs';
import About from './component/About';
import CreateBlog from './component/CreateBlog';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ChangeForm from './component/ChangeForm';
import BlogDetail from './component/BlogDetail';
import EditBlog from './component/EditBlog';
import FileUplod from './component/FileUplod';

function App(){
  return(
    <>
    <div className='bg-dark text-center py-2 shadow-lg'>
  <h1 className='text-white'>React & Laravel Blog App</h1>
    </div>
    <Routes>
      <Route path='/' element={<Blogs/>}/>
      <Route path='/createblog' element={<CreateBlog/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/blog/:id' element={<BlogDetail/>}/>
      <Route path='/edit/:id' element={<EditBlog/>}/>
      <Route path='/file' element={<FileUplod/>}/>
      
      
    
    </Routes>
    <ToastContainer />

 
    </>
  )
}
export default App;