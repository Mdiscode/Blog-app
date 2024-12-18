<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Demo;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class DemoController extends Controller
{
    function demo(Request $req){
        
        $validator = Validator::make($req->all(),[
            'path'=>'required|image',
            'name'=>'required|min:3'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'=>false,
                'message'=>'Please fix error',
                'errors'=>$validator->errors()
            ]);
        }
        //upload image here
        $name= $req->name;
        $img = $req->path;
        $ext = $img->getClientOriginalExtension();
        $imgName = time().'.'.$ext;
         
        // stor ing info in databasse
        $tempimage = DB::table('demos')->insert([
            'name'=>$name,
            'path'=>$imgName
        ]);

        

        // move image in temp  directory 
        $img->move(public_path('uploads/temp'),$imgName);
         return response()->json([
            'status'=>true,
            'message'=>'Image uploaded successfully',
            'image'=>$tempimage
         ]);
    }
}
