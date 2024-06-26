<?php

namespace App\Http\Controllers;

use Dompdf\Dompdf;
use App\Http\Requests\EmployeRequest;
use App\Http\Resources\EmployeResource;
use App\Models\Career;
use App\Models\Client;
use App\Models\Employe;
use App\Models\Kerjasama;
use App\Models\User;
use Dompdf\Options;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EmployeController extends Controller
{
    public function index()
    {
        
        $employes = Employe::with('client')->get();
        $clients = Client::all();
        $employe = EmployeResource::collection($employes);
        return Inertia::render('EmployePages/IndexEmploye', compact('employe', 'clients'));
    }

    public function create()
    {
        $employe = Employe::all();
        $users = User::whereNotIn('nama_lengkap', $employe->pluck('name'))->get();
        $clients = Client::all();
        return Inertia::render('EmployePages/CreateEmploye', compact('users', 'clients'));
    }

    public function store(EmployeRequest $request)
    {
        $employes = new Employe();


        $employe = [
            'user_id' => $request->user_id,
            'name' => $request->name,
            'ttl' => $request->ttl,
            'nik' => $request->nik,
            'no_kk' => $request->no_kk,
            'no_ktp' => $request->no_ktp,
            'client_id' => $request->client_id,
            'jenis_bpjs' => $request->jenis_bpjs,
            'no_bpjs_kesehatan' => $request->no_bpjs_kesehatan,
            'no_bpjs_ketenaga' => $request->no_bpjs_ketenaga,
            'img' => $request->img,
            'img_ktp_dpn' => $request->img_ktp_dpn,
            'file_bpjs_kesehatan' => $request->file_bpjs_kesehatan,
            'file_bpjs_ketenaga' => $request->file_bpjs_ketenaga,
        ];

        if($employe)
        {
            if($request->hasFile('img'))
            {
                $employe['img'] = UploadImage($request, 'img');
            }

            if($request->hasFile('img_ktp_dpn'))
            {
                $employe['img_ktp_dpn'] = UploadImage($request, 'img_ktp_dpn');
            }

            if($request->hasFile('file_bpjs_kesehatan'))
            {
                $employe['file_bpjs_kesehatan'] = UploadBPJS($request, 'file_bpjs_kesehatan');
            }

            if($request->hasFile('file_bpjs_ketenaga'))
            {
                $employe['file_bpjs_ketenaga'] = UploadBPJS($request, 'file_bpjs_ketenaga');
            }
            try {
                $employes->create($employe);
            } catch (\Illuminate\Database\QueryException $e) {
                Log::error($e);
                return $e;
            }
        }

        return redirect()->back();

    }
    public function edit($id)
    {
        $employe = Employe::findOrFail($id);
        $clients = Client::all();
        return Inertia::render('EmployePages/EditEmploye', compact('employe', 'clients'));
        
    }

    public function update(Request $request, $id)
    {
        $employes = Employe::findOrFail($id);

        $employe = [
            'user_id' => $request->user_id,
            'name' => $request->name,
            'ttl' => $request->ttl,
            'nik' => $request->nik,
            'no_kk' => $request->no_kk,
            'no_ktp' => $request->no_ktp,
            'client_id' => $request->client_id,
            'img' => $request->img,
            'img_ktp_dpn' => $request->img_ktp_dpn,
            'jenis_bpjs' => $request->jenis_bpjs,
            'no_bpjs_kesehatan' => $request->no_bpjs_kesehatan,
            'file_bpjs_kesehatan' => $request->file_bpjs_kesehatan,
            'no_bpjs_ketenaga' => $request->no_bpjs_ketenaga,
            'file_bpjs_ketenaga' => $request->file_bpjs_ketenaga,
        ];
        if($employe)
        {
            
            if($request->hasFile('img'))
            {
                if($request->oldimage)
                {
                    Storage::disk('public')->delete('images/' . $request->oldimage);
                }
                $employe['img'] = UploadImage($request, 'img');
            }else{
                $employe['img'] = $request->oldimage;
            }

            if($request->hasFile('img_ktp_dpn'))
            {
                if($request->oldktp)
                {
                    Storage::disk('public')->delete('images/' . $request->oldktp);
                }
                $employe['img_ktp_dpn'] = UploadImage($request, 'img_ktp_dpn');
            }else{
                $employe['img_ktp_dpn'] = $request->oldktp;
            }

            if($request->hasFile('file_bpjs_kesehatan'))
            {
                if($request->oldFileBpjs)
                {
                    Storage::disk('public')->delete('bpjs/' . $request->oldFileBpjs);
                }
                $employe['file_bpjs_kesehatan'] = UploadBPJS($request, 'file_bpjs_kesehatan');
            }else{
                $employe['file_bpjs_kesehatan'] = $request->oldFileBpjs;
            }

            if($request->hasFile('file_bpjs_ketenaga'))
            {
                if($request->oldKetenaga)
                {
                    Storage::disk('public')->delete('bpjs/' . $request->oldKetenaga);
                }
                $employe['file_bpjs_ketenaga'] = UploadBPJS($request, 'file_bpjs_ketenaga');
            }else{
               $employe['file_bpjs_ketenaga'] = $request->oldKetenaga;
            }

            try {
                $employes->update($employe);
            } catch (\Illuminate\Database\QueryException $e) {
                Log::error($e);
                return $e;
            }
        }
    }

    public function show($id)
    {
        $employe = Employe::findOrFail($id);
        $career = Career::where('employe_id', $employe->id)->first();

        return Inertia::render('EmployePages/ShowEmploye', compact('employe', 'career'));
    }

    public function destroy($id)
    {
        $employe = Employe::findOrFail($id);
        $employe->delete();
        return redirect()->back()->with(['messege' => 'Berhasil Hapus Data !']);
    }

    public function download(Request $request)
    {
        if($request->name != 'All')
        {
            $client = Client::on('mysql2connection')->where('name', $request->name)->first();
            $employe = Employe::with('client')->where('client_id', $client->id)->get();
            // dd($employe);
        }
        elseif($request->name == 'All')  {
            $employe = Employe::with('client')->get();
        } 
        
        return Inertia::render('EmployePages/PrintEmploye', compact('employe'));

    }
}
