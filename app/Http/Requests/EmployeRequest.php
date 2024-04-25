<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class EmployeRequest extends FormRequest
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
            'user_id' => ['nullable'],
            'name' => ['nullable'],
            'ttl' => ['nullable'],
            'nik' => ['nullable'],
            'no_kk' => ['nullable'],
            'no_ktp' => ['nullable'],
            'client_id' => ['required'],
            'img' => ['nullable'],
            'img_ktp_dpn' => ['nullable'],
            'img_ktp_bkg' => ['nullable'],
            'jenis_bpjs' => ['nullable'],
            'no_bpjs_kesehatan' => ['nullable'],
            'file_bpjs_kesehatan' => ['nullable'],
            'no_bpjs_ketenaga' => ['nullable'],
            'file_bpjs_ketenaga' => ['nullable'],
        ];
    }
}
