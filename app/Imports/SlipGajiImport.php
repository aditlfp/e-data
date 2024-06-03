<?php

namespace App\Imports;

use App\Models\SlipGaji;
use App\Models\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithBatchInserts;
use Maatwebsite\Excel\Concerns\WithCalculatedFormulas;
use Carbon\Carbon;

class SlipGajiImport implements ToModel, WithHeadingRow, WithBatchInserts,  WithCalculatedFormulas
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */

    public function model(array $row)
    {
        
       // Calculate the total if it's a formula
        $month = date('Y-m');
        $models = SlipGaji::where('bulan_tahun', $month)->get();
        $users = User::on('mysql2connection')->where('nama_lengkap', $row['karyawan'])->first();
                if($row['bulan_dan_tahun'] != null && $users != null)
                {
                    $thisFormat = Carbon::createFromFormat('m-Y', $row['bulan_dan_tahun']);

                    return new SlipGaji([
                        'user_id'       => $users->id,
                        'bulan_tahun'   => $thisFormat->format('Y-m'),
                        'karyawan'      => $row['karyawan'],
                        'formasi'       => $row['formasi'],
                        'mk'            => (int) $row['mk'],
                        'status'        => 'true',
                        'gaji_pokok'    => (int) $row['pokok'],
                        'gaji_lembur'   => (int) $row['lembur'],
                        'tj_jabatan'    => (int) $row['jabatan'],
                        'tj_kehadiran'  => (int) $row['kehadiran'],
                        'tj_kinerja'    => (int) $row['kinerja'],
                        'bpjs'          => (int) $row['bpjs'],
                        'pinjaman'      => (int) $row['pinjaman'],
                        'absen'         => (int) $row['absen'],
                        'lain_lain'     => (int) $row['lain_lain'],
                        'total'         => $row['total'],
                    ]);
                }
                   

                
                // Debugging to check the $datas array
    }

    public function rules(): array
    {
        return [
                'user_id' => ['nullable'],
                'bulan_tahun' => ['nullable'],
                'status' => ['nullable'],
                'gaji_pokok' => ['nullable'],
                'gaji_lembur' => ['nullable'],
                'tj_jabatan' => ['nullable'],
                'tj_kehadiran' => ['nullable'],
                'tj_kinerja' => ['nullable'],
                'bpjs' => ['nullable'],
                'pinjaman' => ['nullable'],
                'absen' => ['nullable'],
                'lain_lain' => ['nullable'],
        ];
    }

    public function batchSize(): int
    {
        return 100;
    }
}
