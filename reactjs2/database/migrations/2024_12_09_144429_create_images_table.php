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
        Schema::create('images', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('name'); // Name column
            // $table->unsignedBigInteger('B_id')->nullable(); // Foreign key column (must be defined properly)
            $table->timestamps(); // Assuming you meant a date field
        
            // // Define the foreign key
            // $table->foreign('B_id')
            //     ->references('B_id')
            //     ->on('blogs')
            //     ->onUpdate('cascade') // Cascade on updates
            //     ->onDelete('cascade'); // Cascade on deletes
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('images');
    }
};
