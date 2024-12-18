<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\TempImage;
use Illuminate\Support\Facades\DB;

class TempImageController extends Controller
{
    public function store(Request $req){
        // echo "hello";
        // return response()->json([
        //     'status'=>true,
        //     'message'=>'Image uploaded successfully',
        //     'image'=>'imagereturn'
        //  ]);
        //apply validation
        $validator = Validator::make($req->all(),[
            'image'=>'required|image'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>false,
                'message'=>'Please fix error',
                'errors'=>$validator->errors()
            ]);
        }
        //upload image here
        $img = $req->image;
        $ext = $img->getClientOriginalExtension();
        $imgName = time().'.'.$ext;
         
        // stor ing info in databasse
        $tempimage = DB::table('images')->insert([
            'name'=>$imgName
        ]);
           // move image in temp  directory 
        $img->move(public_path('uploads/temp'),$imgName);
         if($tempimage){
            $tempid = TempImage::orderBy('created_at','DESC')->value('name');
            
         }
        

        
         return response()->json([
            'status'=>true,
            'message'=>'Image uploaded successfully',
            'image'=>$imgName,
            'id'=>$tempid
         ]);
        
    

    
}
// function showimg(){
//     $tempimg =TempImage::orderBy('created_at','DESC')->get();

//   return response()->json([
//     "status"=>true,
//     "data"=>$tempimg
//   ]);
// }
     function show(){
        $tempid = TempImage::where('id',2)->value('name');

        $update = TempImage::where('name',$tempid)->update([ 'name'=>'taj.png']);
        // $tempid = TempImage::all();
        return $tempid;
     }
}