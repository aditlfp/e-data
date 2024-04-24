<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{

    public function index()
    {
        $authUser = Auth::user()->id;
        $user = User::on('mysql2connection')->where('id', $authUser)->firstOrFail();

        return Inertia::render('Admin/Dashboard/Index', compact('user'));
    }

}
