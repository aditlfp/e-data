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
        Schema::create('slip_gajis', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class);
            $table->string('mk');
            $table->string('bulan_tahun');
            $table->string('status');
            $table->string('gaji_pokok');
            $table->string('gaji_lembur');
            $table->string('tj_jabatan');
            $table->string('tj_kehadiran');
            $table->string('tj_kinerja');
            $table->string('bpjs');
            $table->string('pinjaman')->nullable();
            $table->string('absen')->nullable();
            $table->string('lain_lain');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('slip_gajis');
    }
};
