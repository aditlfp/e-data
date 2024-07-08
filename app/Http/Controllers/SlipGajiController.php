<?php

namespace App\Http\Controllers;

use App\Models\SlipGaji;
use App\Http\Controllers\Controller;
use App\Http\Requests\SlipGajiRequest;
use App\Models\Absensi;
use App\Models\Client;
use App\Models\Divisi;
use App\Models\Employe;
use App\Models\Kerjasama;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Imports\SlipGajiImport;
use App\Exports\SlipGajiExport;
use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Support\Facades\Storage;

class SlipGajiController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $employe = Employe::all();
        $currentMonth = date('Y-m');
        $employe = User::on('mysql2connection')->with('latestSlip')->get();
        $slip = SlipGaji::whereIn('user_id', $employe->pluck('id'))->latest()->get();
        $mitra = Kerjasama::on('mysql2connection')->with('client')->get();
        $divisi = Divisi::on('mysql2connection')->get();
        return Inertia::render('SlipGajiPages/IndexSlip', compact('currentMonth', 'employe', 'slip', 'mitra', 'divisi'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $mitra = $request->mitra;
        $bulan = $request->bulan;
        $bulanFormat = Carbon::createFromFormat('Y-m', $request->bulan);
        $client = Kerjasama::on('mysql2connection')->with('client')->where('client_id', $mitra)->first();
        $employe = Employe::all();
        $divisi = Divisi::on('mysql2connection')->get();
        
        $slip = SlipGaji::where('bulan_tahun', $bulan)->get();
        
       $user = User::on('mysql2connection')
                ->with('devisi')
                ->where('kerjasama_id', $client->id)
                ->orderBy('kerjasama_id', 'asc')
                ->whereIn('nama_lengkap', $employe->pluck('name')->toArray())
                ->whereNotIn('id', $slip->pluck('user_id')->toArray())
                ->get();

        $absensi = Absensi::on('mysql2connection')->where('kerjasama_id', $mitra)->whereYear('tanggal_absen', $bulanFormat->year)->whereMonth('tanggal_absen', $bulanFormat->month)->get();
        
        return Inertia::render('SlipGajiPages/CreateSlip', compact('employe', 'user', 'bulan', 'divisi', 'absensi', 'mitra', 'client', 'slip'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        foreach ($request->users as $userData) {
            // Process each user's data and save it accordingly
            // dd($userData);
            if ($userData['gaji_pokok'] != null) {
                SlipGaji::create([
                    'user_id' => $userData['user_id'],
                    'bulan_tahun' => $userData['bulan_tahun'],
                    'karyawan' => $userData['nama_lengkap'],
                    'formasi' => $userData['formasi'],
                    'status' => 'true',
                    'gaji_pokok' => $userData['gaji_pokok'],
                    'gaji_lembur' => $userData['gaji_lembur'],
                    'tj_jabatan' => $userData['tj_jabatan'],
                    'tj_kehadiran' => $userData['tj_kehadiran'],
                    'tj_kinerja' => $userData['tj_kinerja'],
                    'tj_lain' => $userData['tj_lain'],
                    'bpjs' => $userData['bpjs'],
                    'pinjaman' => $userData['pinjaman'],
                    'absen' => $userData['absen'],
                    'mk' => $userData['mk'],
                    'lain_lain' => $userData['lain_lain'],
                ]);
            }
        }

        // dd($request->all(), $slip);
        return redirect()->route('slip-gaji.index')->with('success', 'Data saved successfully!');
    }

    
    public function editSlip(Request $request, $id)
    {
        // dd("oke", $id);
        $mitra = $request->mitra;
        $bulan = $request->bulan;

        
        $bulanFormat = Carbon::createFromFormat('Y-m', $bulan);
        $client = Kerjasama::on('mysql2connection')->with('client')->first();
        $employe = Employe::all();
        $divisi = Divisi::on('mysql2connection')->get();
        $user = User::on('mysql2connection')->with('devisi')->where('kerjasama_id', $client->id)->orderBy('kerjasama_id', 'asc')->wherein('nama_lengkap', $employe->pluck('name'))->get();
        
        $absensi = Absensi::on('mysql2connection')->where('kerjasama_id', $mitra)->whereYear('tanggal_absen', $bulanFormat->year)->whereMonth('tanggal_absen', $bulanFormat->month)->get();
        $slip = SlipGaji::with(['user'])->where('bulan_tahun', $bulan)->get();
        // dd($slip);
        
        return Inertia::render('SlipGajiPages/EditSlip', compact('employe', 'user', 'bulan', 'divisi', 'absensi', 'mitra', 'client', 'slip'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        foreach ($request->users as $userData) {
            // Process each user's data and save it accordingly
            if ($userData['gaji_pokok'] != null) {
                $slip = [
                    'user_id' => $userData['user_id'],
                    'bulan_tahun' => $userData['bulan_tahun'],
                    'karyawan' => $userData['karyawan'],
                    'formasi' => $userData['formasi'],
                    'status' => 'true',
                    'gaji_pokok' => $userData['gaji_pokok'],
                    'gaji_lembur' => $userData['gaji_lembur'],
                    'tj_jabatan' => $userData['tj_jabatan'],
                    'tj_kehadiran' => $userData['tj_kehadiran'],
                    'tj_kinerja' => $userData['tj_kinerja'],
                    'tj_lain' => $userData['tj_lain'],
                    'bpjs' => $userData['bpjs'],
                    'pinjaman' => $userData['pinjaman'],
                    'absen' => $userData['absen'],
                    'mk' => $userData['mk'],
                    'lain_lain' => $userData['lain_lain'],
                ];
                SlipGaji::findOrFail($userData['id'])->update($slip);
            }
        }
        return redirect()->back();
    }

    public function import(Request $request)
    {

        $request->validate([
            'file' => 'required|mimes:xls,xlsx,csv',
        ]);

        // dd($request->file('file'));
        $file = $request->file('file');

    
        if($request->hasFile('file'))
        {
            Excel::import(new SlipGajiImport, $file);
            
        }else{
            dd("ERROR");
        }

        return redirect()->back()->with('messege', 'Successfully To Import Slip Gaji From Excell !');

    }

    public function downloadTemplate(Request $request)
    {
        $mitra = $request->mitra;
        $bulan = $request->bulan;
        $bulanFormat = Carbon::createFromFormat('Y-m', $bulan);
        $slip = SlipGaji::where('bulan_tahun', $bulan)->get();
        $client = Kerjasama::on('mysql2connection')->with('client')->where('id', $mitra)->first();
        $employe = Employe::pluck('name');
        return Excel::download(
            (new SlipGajiExport)
                ->forWith('devisi')
                ->forKerjasama($client->id)
                ->forOrder('asc')
                ->forWhereIn($employe->toArray())
                ->forWhereNotIn($slip->pluck('user_id')->toArray())
                ->withAdditionalParams($bulan),
            'slip.xlsx'
        );
       
    }

    public function destroy($id)
    {
        SlipGaji::findOrFail($id)->delete();
        return redirect()->back()->with(['messege' => 'Berhasil Hapus Data !']);
    }

}
