<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Proyecto extends Model
{
    protected $table = "projects";

    protected $fillable = [
        'nombre',
        'desc',
        'f_ini',
        'f_end',
        "user",
    ];
}
