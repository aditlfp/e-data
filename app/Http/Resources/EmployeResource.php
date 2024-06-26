<?php

namespace App\Http\Resources;

use App\Models\Client;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class EmployeResource extends JsonResource
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
            'user_id' => $this->user_id,
            'name' => $this->name,
            'ttl' => $this->ttl,
            'nik' => $this->nik,
            'no_kk' => $this->no_kk,
            'no_ktp' => $this->no_ktp,
            'client_id' => $this->client_id,
            'img' => $this->img,
            'img_ktp_dpn' => $this->img_ktp_dpn,
            'jenis_bpjs' => $this->jenis_bpjs,
            'no_bpjs_kesehatan' => $this->no_bpjs_kesehatan,
            'file_bpjs_kesehatan' => $this->file_bpjs_kesehatan,
            'no_bpjs_ketenaga' => $this->no_bpjs_ketenaga,
            'file_bpjs_ketenaga' => $this->file_bpjs_ketenaga,
            'user' => $this->user_id ? User::on('mysql2connection')->where('id',$this->user) : "",
            'client' => Client::on('mysql2connection')->where('id', $this->client_id)->first(),
            'created_at' => $this->created_at
        ];
    }
}
