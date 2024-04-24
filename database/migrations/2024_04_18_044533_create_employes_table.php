<?php

use App\Models\Client;
use App\Models\User;
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
        Schema::create('employes', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->nullable();
            $table->string('name')->nullable();
            $table->string('ttl')->nullable();
            $table->string('nik')->nullable();
            $table->string('no_kk')->nullable();
            $table->foreignIdFor(Client::class);
            $table->string('img')->nullable();
            $table->string('img_ktp_dpn')->nullable();
            $table->string('img_ktp_bkg')->nullable();
            $table->string('jenis_bpjs')->nullable();
            $table->string('no_bpjs_kesehatan')->nullable();
            $table->string('file_bpjs_kesehatan')->nullable();
            $table->string('no_bpjs_ketenaga')->nullable();
            $table->string('file_bpjs_ketenaga')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employes');
    }
};
