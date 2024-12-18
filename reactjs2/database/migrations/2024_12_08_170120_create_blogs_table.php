<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('blogs', function (Blueprint $table) {
            $table->id(); // Primary key column named B_id
            $table->string('title'); // Blog title
            $table->string('shortDesc')->nullable(); // Optional short description
            $table->string('image')->nullable(); // Optional image
            $table->text('description')->nullable(); // Optional detailed description
            $table->string('author'); // Author of the blog
            $table->timestamps(); // Created at and updated at timestamps
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('blogs');
    }
};
