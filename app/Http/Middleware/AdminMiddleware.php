<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $authUser = Auth::user()->id;
        $user = User::on('mysql2connection')->where('id', $authUser)->firstOrFail();
        if($user->role->name == 'user')
        {
            return to_route('dashboard')->with(['message' => 'Dont Have Previllage !!']);
        }
        
        return $next($request);
    }
}
