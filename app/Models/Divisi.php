<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Divisi extends Model
{
    protected $connection = 'mysql2connection';

    public function Jabatan()
    {
        return $this->belongsTo(Jabatan::class);
    }
}
