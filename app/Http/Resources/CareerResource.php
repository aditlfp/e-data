<?php

namespace App\Http\Resources;

use App\Models\Employe;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CareerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'employe_id' => $this->employe_id,
            'mulai_masuk' => $this->mulai_masuk,
            'sk_mulai_masuk' => $this->sk_mulai_masuk,
            'jenjang_karir' => $this->jenjang_karir,
            'file_sk_kontrak' => $this->file_sk_kontrak,
            'leader'  => $this->leader,
            'employe' => Employe::where('id', $this->employe_id)->first()
        ];
    }
}
