<?php
use Illuminate\Support\Facades\Crypt;

function UploadImage($request, $NameFile)
{

    $file = $request->file($NameFile);
    if ($file != null && $file->isValid()) {
        
        $extensions = $file->getClientOriginalExtension();
        $randomNumber = mt_rand(1, 999999999999);
        $rename = 'data' . $randomNumber . '.' . $extensions;
        
        $path = public_path('storage/images/' . $rename);
        $file->storeAs('images', $rename, 'public');
    
        return $rename;
      
    }
}
function UploadBPJS($request, $NamaPDF)
{
    $file = $request->file($NamaPDF);
    if($file != null && $file->isValid()) {

        $extensions = $file->getClientOriginalExtension();
        $randomName = mt_rand(1, 9999999);
        $rename = 'bpjs' . $randomName . '.' . $extensions;
        $path = public_path('storage/bpjs/' . $rename);
        $file->storeAs('bpjs', $rename, 'public');
        

        return $rename;
    }
}
function UploadSK($request, $NamaPDF)
{
    $file = $request->file($NamaPDF);
    if($file != null && $file->isValid()) {

        $extensions = $file->getClientOriginalExtension();
        $randomName = mt_rand(1, 9999999);
        $rename = 'sk_kontrak' . $randomName . '.' . $extensions;
        $path = public_path('storage/sk_kontrak/' . $rename);
        $file->storeAs('sk_kontrak', $rename, 'public');
        

        return $rename;
    }
}

function decryptField($field)
{
    try {
        // Attempt to decrypt the field
        return Crypt::decryptString($field);
    } catch (\Exception $e) {
        // If decryption fails, assume the field is not encrypted and use it as is
        return $field;
    }
}