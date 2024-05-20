<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Divisi extends Model
{
    protected $connection = 'mysql2connection';

    protected $table = 'data_auth.divisis';

    public function Jabatan()
    {
        return $this->belongsTo(Jabatan::class);
    }
}
