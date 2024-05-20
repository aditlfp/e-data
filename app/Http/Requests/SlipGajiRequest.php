<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SlipGajiRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
                'user_id' => ['required'],
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
}
