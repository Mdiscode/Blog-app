<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

use Illuminate\Support\Facades\File;

use App\Models\Blog;
use App\Models\TempImage;

class BlogController extends Controller
{
    //this metho will return all blogs
    function index(Request $request){
    $blogs = Blog::orderBy('created_at','DESC');
    //  Log::info('hello error');
    if(!empty($request->keyword)){
      $blogs = $blogs->where('title','like','%'.$request->keyword.'%');
    }
    $blogs = $blogs->get();
    // echo $blogs->title;
    return response()->json([
      "status"=>true,
      "data"=>$blogs
    ]);
    
    
    }
    
    
    //this{ method will return a single blog
    function show($id){
      $blog = Blog::find($id);
      if($blog == null){
        return response()->json([
          'status'=>false,
          'message'=>"Blog not found"
        ]);
      }
      // $blog['date'] = \Carbon\Carbon::parse($blog->create_at)->format('d,M,Y');
      $blog['date'] = $blog->created_at->format('d, M, Y');

      //return respon
      return response()->json([
        'status'=>true,
        'data'=>$blog
      ]);
    }
      

    //this method will store a blog
    // ...............store.................................
    public function store(Request $request){

      // $tempname = TempImage::orderBy('created_at','DESC')->value('name');


    $validator = Validator::make($request->all(), [
      'author' => 'required|min:3',
      'title' => 'required|min:5',
    ]);
  
          if($validator->fails()) {
              return response()->json([
                  'status' => false,
                  'message' => 'Please fix the errors',
                  'errors' => $validator->errors(),
              ]);
          }
  
          // $tempname = TempImage::where('id',$request->imageId)->value('name');

    //   //  $blog = new Blog();
      $table = DB::table('blogs')->insert([
        'title'=>$request->title,
        'shortDesc'=>$request->shortDesc,
        'image'=>$request->imgname,
        // 'image'=>$request->imageid,
        // 'image'=>"img3",
        'description'=>$request->description,
        'author'=>$request->author
      ]);
      
    
      

      return response()->json([
        'status'=>true,
        'message'=>'Blog added successfully',
        'data'=> $table
      ]);

      //upload image
       
    }
      //save image here
      // // Find the temporary image
          // //  $tempid = TempImage::where('id',)->value('name');
          //  $blogid = Blog::orderBy('created_at','DESC')->value('id');
          //  $update = Blog::where('id',$blogid)->update(['image'=>$tempid]);
          

          // Create a new Blog instance
          
           // Save the blog instance
          

      // // Copy the temporary image to the blogs directory
      // $sourcePath = public_path('uploads/temp/' . $tempImage->name);
      // $destPath = public_path('uploads/blogs/' . $imageName);
      // File::copy($sourcePath, $destPath);

      // // Optional: Delete the temporary image after copying
      // File::delete($sourcePath);



    
  
  


    //this method will update a blog
    function update($id,Request $request){
      $findid = Blog::find($id);
      // return $findid->title;
      if ($findid == null){
        return response()->json([
          'status'=>false,
          "message"=>"Blog not found"
        ]);
      }
      $validator = Validator::make($request->all(), [
        'title' => 'required|min:7',
        'author' => 'required|min:3',
    ]);
    
  
    // return "hello";
    if($validator->fails()){
        return response()->json([
            'status'=>false,
            'message'=>'Please fix the errors',
            'errors'=>$validator->errors()
        ]);
    }

     // Update the blog
     $findid->update([
      'title' => $request->title,
      'shortDesc' => $request->shortDesc,
      'image' => $request->image,
      'description' => $request->description,
      'author' => $request->author
  ]);
    return response()->json([
      'status'=>true,
      'message'=>"Blog updated successfully",
      'data'=>$findid
    ]);
    }



    //this method will delete a blog
    // use Illuminate\Support\Facades\File;

      function destroy($id)
      {
          // Find the blog by ID
          $blog = Blog::find($id);

          // Check if the blog exists
          if ($blog == null) {
              return response()->json([
                  'status' => false,
                  'message' => "Blog not found"
              ], 404);
          }

            // Delete the blog image if it exists
            $imagePath = public_path('uploads/blogs/' . $blog->image);
            if (File::exists($imagePath)) {
                File::delete($imagePath);
            }

            // Delete the blog record
            $blog->delete();

            // Return success response
            return response()->json([
                'status' => true,
                'message' => "Blog deleted successfully"
            ], 200);
        }

  }
