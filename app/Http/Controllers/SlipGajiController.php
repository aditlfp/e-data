<?php

namespace App\Http\Controllers;

use App\Models\SlipGaji;
use App\Http\Controllers\Controller;
use App\Models\Client;
use App\Models\Divisi;
use App\Models\Employe;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SlipGajiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $employe = Employe::all();
        $slip = SlipGaji::all();
        $mitra = Client::all();
        return Inertia::render('SlipGajiPages/IndexSlip', compact('employe', 'slip', 'mitra'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $mitra = $request->mitra;
        $bulan = $request->bulan;
        $employe = Employe::all();
        $divisi = Divisi::on('mysql2connection');
        $user = User::on('mysql2connection')->where('kerjasama_id', $mitra)->orderBy('kerjasama_id', 'asc')->wherein('nama_lengkap', $employe->pluck('name'))->get();
        // dd($user, $divisi);
        return Inertia::render('SlipGajiPages/CreateSlip', compact('employe', 'user', 'bulan'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $slips = new SlipGaji();

        // dd($request->users);
        foreach ($request->users as $userData) {
            // Process each user's data and save it accordingly
            if ($userData['gaji_pokok'] != null) {
                SlipGaji::create([
                    'user_id' => $userData['user_id'],
                    'bulan_tahun' => '05-2024',
                    'status' => 'oke',
                    'gaji_pokok' => $userData['gaji_pokok'],
                    'gaji_lembur' => $userData['gaji_lembur'],
                    'tj_jabatan' => $userData['tj_jabatan'],
                    'tj_kehadiran' => $userData['tj_kehadiran'],
                    'tj_kinerja' => $userData['tj_kinerja'],
                    'bpjs_kesehatan' => $userData['bpjs_kesehatan'],
                    'bpjs_ketenaga' => $userData['bpjs_ketenaga'],
                    'qurban' => $userData['qurban'],
                    'lain_lain' => $userData['lain_lain'],
                ]);
            }
        }

        // dd($request->all(), $slip);
        return redirect()->route('slip-gaji.index')->with('success', 'Data saved successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(SlipGaji $slipGaji)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SlipGaji $slipGaji)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, SlipGaji $slipGaji)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SlipGaji $slipGaji)
    {
        //
    }
}
