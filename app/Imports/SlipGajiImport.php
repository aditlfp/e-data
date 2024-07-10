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
use Maatwebsite\Excel\Concerns\WithEvents;
use Maatwebsite\Excel\Concerns\RegistersEventListeners;

class SlipGajiImport implements ToModel, WithHeadingRow, WithBatchInserts,  WithCalculatedFormulas, WithEvents, WithValidation
{
    use RegistersEventListeners;
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */

    public function model(array $row)
    {
       // Calculate the total if it's a formula
        if ($row['pokok'] === null) {
            return null;
        }
        $month = date('Y-m');
        $models = SlipGaji::where('bulan_tahun', $month)->get();
        $users = User::on('mysql2connection')->where('nama_lengkap', $row['karyawan'])->first();
                if($row['bulan_tahun'] != null && $users != null)
                {
                    // dd(Carbon::now())
                  $bulan_tahun = $row['bulan_tahun'];

                    // Check if the format is '05-2024' and convert to 'm-Y'
                    if (preg_match('/^\d{2}-\d{4}$/', $bulan_tahun)) {
                        $bulan_tahun = Carbon::createFromFormat('m-Y', $bulan_tahun)->format('Y-m');
                    }

                    return new SlipGaji([
                        'user_id'       => $users->id,
                        'bulan_tahun'   => $bulan_tahun,
                        'karyawan'      => $row['karyawan'],
                        'formasi'       => $row['formasi'],
                        'mk'            => (int) $row['mk'],
                        'status'        => 'true',
                        'gaji_pokok'    => (int) $row['pokok'],
                        'gaji_lembur'   => (int) $row['lembur'],
                        'tj_jabatan'    => (int) $row['jabatan'],
                        'tj_kehadiran'  => (int) $row['kehadiran'],
                        'tj_kinerja'    => (int) $row['kinerja'],
                        'tj_lain'       => (int) $row['lain_lain'],
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
                'tj_lain' => ['nullable'],
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

    public function headingRow(): int
    {
        return 2; // Because the actual headings start from row 2
    }

    public function mappedCells(): array
    {
        return [
            'bulan_tahun' => 'A3',
            'karyawan' => 'B3',
            'formasi' => 'C3',
            'mk' => 'D3',
            'pokok' => 'E3',
            'lembur' => 'F3',
            'jabatan' => 'G3',
            'kehadiran' => 'H3',
            'kinerja' => 'I3',
            'lain_lain' => 'J3',
            'bpjs' => 'K3',
            'pinjaman' => 'L3',
            'absen'  => 'M3',
            'lain_lain' => 'N3',
            'total' => 'O3',
        ];
    }
}
