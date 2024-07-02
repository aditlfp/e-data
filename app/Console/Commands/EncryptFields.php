<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Crypt;
use App\Models\Employe;

class EncryptFields extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:encrypt-fields';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    public function __construct()
    {
        parent::__construct();
    }

    public function handle()
    {
        // Retrieve the first 150 employees
        $employees = Employe::limit(150)->get();

        foreach ($employees as $employee) {
            // Check if the fields are not already encrypted
            if (!$this->isEncrypted($employee->no_kk)) {
                $employee->no_kk = Crypt::encryptString($employee->no_kk);
            }
            if (!$this->isEncrypted($employee->no_ktp)) {
                $employee->no_ktp = Crypt::encryptString($employee->no_ktp);
            }
            $employee->save();
        }

        $this->info('Fields encrypted successfully for 150 employees.');
    }

    private function isEncrypted($value)
    {
        try {
            Crypt::decryptString($value);
        } catch (\Exception $e) {
            return false;
        }
        return true;
    }
}
