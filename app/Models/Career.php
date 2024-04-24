<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Career extends Model
{
    use HasFactory;
    protected $casts = [
        'file_sk_kontrak' => 'array',
        'jenjang_karir' => 'array',
        'leader' => 'array'
    ];
    protected $fillable = [
        'employe_id',
        'mulai_masuk',
        'jenjang_karir',
        'file_sk_kontrak',
        'leader'
    ];

    public function Employe()
    {
        return $this->belongsTo(Employe::class);
    }
}
