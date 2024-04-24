<?php

namespace App\Http\Controllers;

use App\Http\Requests\CareerRequest;
use App\Http\Resources\CareerResource;
use App\Http\Resources\EmployeResource;
use App\Models\Career;
use App\Models\Employe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CareerController extends Controller
{
    public function index()
    {
        $careers = DB::table('careers')->paginate(25);
        $career = CareerResource::collection($careers);
        return Inertia::render('CareerPage/IndexCareer', compact('career'));
    }
    public function show($id)
    {
        $career = Career::with(['employe'])->findOrFail($id);
        
        return Inertia::render('CareerPage/IndexCareer', compact('career'));
    }

    public function create()
    {
        $employes = Employe::all();
        return Inertia::render('CareerPage/CreateCareer', compact('employes'));
    }

    public function createCareer($id)
    {
        $employe = DB::table('employes')->where('id', $id)->get();
        $employes = EmployeResource::collection($employe);
        return Inertia::render('CareerPage/CreateCareer', compact('employes'));
    }

    public function store(CareerRequest $request)
    {
        $career = new Career();
        $careers = [
            'employe_id' => $request->employe_id,
            'mulai_masuk' => $request->mulai_masuk,
            'jenjang_karir' => $request->jenjang_karir,
            'file_sk_kontrak' => $request->file_sk_kontrak,
            'leader'  => $request->leader
        ];

        if($request->hasFile('file_sk_kontrak'))
        {
            foreach ($request->file('file_sk_kontrak') as $sk) {
                if($sk != null) {

                    $extensions = $sk->getClientOriginalExtension();
                    $randomName = mt_rand(1, 9999999);
                    $rename = 'bpjs' . $randomName . '.' . $extensions;
                    $path = public_path('storage/file_sk/' . $rename);
                    $sk->storeAs('sk_kontrak', $rename, 'public');

                    $careers['file_sk_kontrak'] = implode(',', $rename); 
                }
            }
        }

        try {
           $career->create($careers);
           return redirect()->back();
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e);
            return $e;
        }
    }

    public function storeCareer(CareerRequest $request)
    {
        $career = new Career();
        $careers = [
            'employe_id' => $request->employe_id,
            'mulai_masuk' => $request->mulai_masuk,
            'jenjang_karir' => $request->jenjang_karir,
            'file_sk_kontrak' => $request->file_sk_kontrak,
            'leader'  => $request->leader
        ];

        $skKontrak = [];
        $leader = [];

        if($request->hasFile('file_sk_kontrak'))
        {
            foreach ($request->file('file_sk_kontrak') as $sk) {
                if($sk != null) {

                    $extensions = $sk->getClientOriginalExtension();
                    $randomName = mt_rand(1, 9999999);
                    $rename = 'file_sk' . $randomName . '.' . $extensions;
                    $path = public_path('storage/file_sk/' . $rename);
                    $sk->storeAs('sk_kontrak', $rename, 'public');
                    $skKontrak[] = $rename;
                }
                $careers['file_sk_kontrak'] = $skKontrak; 
            }
        }
        if($request->hasFile('mulai_masuk'))
        {
            $careers['mulai_masuk'] =  UploadSK($request, 'mulai_masuk'); 
        }
        if($request->hasFile('leader'))
        {
            foreach ($request->file('leader') as $sk) {
                if($sk != null) {

                    $extensions = $sk->getClientOriginalExtension();
                    $randomName = mt_rand(1, 9999999);
                    $rename = 'sk_leader' . $randomName . '.' . $extensions;
                    $path = public_path('storage/file_sk/' . $rename);
                    $sk->storeAs('sk_kontrak', $rename, 'public');
                    $leader[] = $rename;
                }
                $careers['leader'] = $leader; 
            }
        }

        try {
           $career->create($careers);
           return redirect()->back();
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e);
            return $e;
        }
    }

    public function edit($id)
    {
        $career = Career::findOrFail($id);
        return Inertia::render('CareerPage/EditCareer', compact('career'));
    }

    public function update(Request $request, $id)
    {
        $career = Career::findOrFail($id);
        $careers = [
            'employe_id' => $request->employe_id,
            'mulai_masuk' => $request->mulai_masuk,
            'jenjang_karir' => $request->jenjang_karir,
            'file_sk_kontrak' => $request->file_sk_kontrak,
            'leader'  => $request->leader
        ];

        try {
            $career->update($careers);
            return to_route('careers.index');
        } catch (\Illuminate\Database\QueryException $e) {
            Log::error($e);
            return $e;
        }
    }   

    public function destroy($id)
    {
        $career = Career::findOrFail($id);
        $career->delete();
        return redirect()->back();
    }
}
