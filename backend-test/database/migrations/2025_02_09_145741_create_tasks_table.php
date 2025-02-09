<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

use App\Models\Quest;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Quest::class);
            $table->smallInteger('task_number', false, true);
            $table->string('name');
            $table->text('question');
            $table->text('answer');
            $table->enum('type', ['text', 'multiple-choice'])->default('text');
            $table->smallInteger('time_limit', false, true);
            $table->string('media')->nullable();
            $table->timestamps();
            $table->unique(['quest_id', 'task_number']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
