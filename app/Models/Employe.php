<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employe extends Model
{
    use HasFactory;
    protected $casts = [
        'jenis_bpjs' => 'array'
    ];
    protected $fillable = [
        'user_id',
        'name',
        'ttl',
        'nik',
        'no_kk',
        'no_ktp',
        'client_id',
        'img',
        'img_ktp_dpn',
        'img_ktp_bkg',
        'jenis_bpjs',
        'no_bpjs_kesehatan',
        'file_bpjs_kesehatan',
        'no_bpjs_ketenaga',
        'file_bpjs_ketenaga',
    ];

    public function User()
    {
        return $this->belongsTo(User::class);
    }

    public function Client()
    {
        return $this->belongsTo(Client::class);
    }
}
