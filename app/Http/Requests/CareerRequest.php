<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CareerRequest extends FormRequest
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
            'employe_id' => ['required'],
            'mulai_masuk' => ['required'],
            'sk_mulai_masuk' => ['nullable'],
            'jenjang_karir' => ['required'],
            'file_sk_kontrak' => ['required'],
            'leader'  => ['nullable']
        ];
    }
}
