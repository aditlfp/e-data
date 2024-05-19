<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SlipGaji extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'bulan_tahun',
        'status',
        'gaji_pokok',
        'gaji_lembur',
        'tj_jabatan',
        'tj_kehadiran',
        'tj_kinerja',
        'bpjs_kesehatan',
        'bpjs_ketenaga',
        'qurban',
        'lain_lain',
    ];

    public function User()
    {
        return $this->belongsTo(User::class);
    }
}

