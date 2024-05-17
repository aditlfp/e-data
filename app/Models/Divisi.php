<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Divisi extends Model
{
    use HasApiTokens, HasFactory, Notifiable;
    protected $connection = 'mysql2connection';

    public function Jabatan()
    {
        return $this->belongsTo(Jabatan::class);
    }
}
